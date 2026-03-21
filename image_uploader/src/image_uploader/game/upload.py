import logging
import re

from botocore.client import BaseClient

from image_uploader.postgres.connection import get_postgres_connection
from image_uploader.utils.aws import upload_image_to_aws


def upload_game_image_to_s3(
        record: tuple,
        bucket_name: str,
        s3_client: BaseClient,
) -> str:
    """
    Upload game image to AWS S3 and update the database with the URL.

    :param record: Game image details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    :return: URL of the uploaded image.
    """
    logger = logging.getLogger(__name__)
    image_id, psn_url, image_type, game_name, game_id = record
    logger.info(
        f"Processing game image. ID:{image_id}, URL:{psn_url}, TYPE:{image_type}, GAME_NAME:{game_name}, GAME_ID:{game_id}")

    if not game_name:
        logger.warning(f"Game name is null for image {image_id}, using default name")
        game_name = f"game-{game_id}"

    game_name_slug = re.sub(r'[^a-z0-9]+', '-', game_name.lower()).strip('-')
    s3_path = f"psn-game-image/{game_name_slug}_{game_id}/{image_type}/{image_id}"
    aws_url = upload_image_to_aws(psn_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = get_postgres_connection()
    cursor = pg_conn_thread.cursor()
    query = """
            UPDATE app.psn_game_image
            SET aws_url = %s
            WHERE id = %s;
            """
    try:
        logger.info(f"Updating database for image {image_id} with url {aws_url}")
        cursor.execute(query, (aws_url, image_id))
        pg_conn_thread.commit()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Image {image_id} uploaded to AWS with URL: {aws_url}")
    return aws_url
