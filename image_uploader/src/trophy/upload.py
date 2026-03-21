import logging
import re

from botocore.client import BaseClient

from image_uploader.src.postgres.connection import get_postgres_connection
from image_uploader.src.utils.aws import upload_image_to_aws


def upload_trophy_icon_to_s3(
        record: tuple,
        bucket_name: str,
        s3_client: BaseClient
) -> str:
    """
    Upload a trophy icon to AWS S3 and update the database with the URL.

    :param record: Trophy icon details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    :return: URL of the uploaded image.
    """
    logger = logging.getLogger(__name__)
    trophy_id, icon_url, rank, ts_id, game_name, game_id = record
    logger.info(
        f"Processing trophy icon. ID:{trophy_id}, URL:{icon_url}, RANK:{rank}, TS_ID:{ts_id}, GAME_NAME:{game_name}, GAME_ID:{game_id}")

    game_name_slug = re.sub(r'[^a-z0-9]+', '-', game_name.lower()).strip('-')
    s3_path = f"psn-trophy/{game_name_slug}_{game_id}/{ts_id}/{rank}_{trophy_id}"
    aws_url = upload_image_to_aws(icon_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = get_postgres_connection()
    cursor = pg_conn_thread.cursor()
    query = """
            UPDATE app.psn_trophy
            SET aws_icon_url = %s
            WHERE id = %s;
            """
    try:
        logger.info(f"Updating database for trophy {trophy_id} with url {aws_url}")
        cursor.execute(query, (aws_url, trophy_id))
        pg_conn_thread.commit()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Image of trophy {trophy_id} uploaded to AWS with URL: {aws_url}")
    return aws_url
