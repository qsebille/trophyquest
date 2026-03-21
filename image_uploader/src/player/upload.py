import logging
import re

from botocore.client import BaseClient

from image_uploader.src.postgres.connection import get_postgres_connection
from image_uploader.src.utils.aws import upload_image_to_aws


def upload_player_avatar_to_s3(
        record: tuple,
        bucket_name: str,
        s3_client: BaseClient,
) -> str:
    """
    Upload player avatar to AWS S3 and update the database with the URL.

    :param record: Player avatar details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    :return: URL of the uploaded avatar.
    """
    logger = logging.getLogger(__name__)
    player_id, psn_url, pseudo = record
    logger.info(f"Processing player avatar: ID:{player_id}, URL:{psn_url}, PSEUDO:{pseudo}")

    if not pseudo:
        logger.warning(f"Pseudo is null for player {player_id}, using default name")
        pseudo = f"player-{player_id}"

    player_slug = re.sub(r'[^a-z0-9]+', '-', pseudo.lower()).strip('-')
    s3_path = f"psn-player/{player_slug}_{player_id}"
    aws_url = upload_image_to_aws(psn_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = get_postgres_connection()
    cursor = pg_conn_thread.cursor()
    query = """
            UPDATE app.psn_player
            SET aws_avatar_url = %s
            WHERE id = %s;
            """
    try:
        logger.info(f"Updating database for player {player_id} with url {aws_url}")
        cursor.execute(query, (aws_url, player_id))
        pg_conn_thread.commit()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Avatar for player {pseudo} uploaded to AWS with URL: {aws_url}")
    return aws_url
