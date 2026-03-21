import logging
import re

from botocore.client import BaseClient

from image_uploader.postgres.connection import get_postgres_connection
from image_uploader.utils.aws import upload_image_to_aws


def upload_trophy_suite_image_to_s3(
        record: tuple,
        bucket_name: str,
        s3_client: BaseClient
) -> str:
    """
    Upload the trophy suite image to AWS S3 and update the database with the URL.

    :param record: Trophy suite image details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    :return: AWS URL of the uploaded image.
    """
    logger = logging.getLogger(__name__)
    ts_id, ts_url, ts_name = record
    logger.info(f"Processing trophy suite image. TS_ID: {ts_id}, TS_NAME: {ts_name}, TS_URL: {ts_url}")

    name_slug = re.sub(r'[^a-z0-9]+', '-', ts_name.lower()).strip('-')
    s3_path = f"psn-trophy-suite/{name_slug}_{ts_id}"
    aws_url = upload_image_to_aws(ts_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = get_postgres_connection()
    cursor = pg_conn_thread.cursor()
    query = """
            UPDATE app.psn_trophy_suite
            SET aws_image_url = %s
            WHERE id = %s;
            """
    try:
        logger.info(f"Updating database for trophy suite {ts_id} with url {aws_url}")
        cursor.execute(query, (aws_url, ts_id))
        pg_conn_thread.commit()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Image of trophy suite {ts_id} uploaded to AWS with URL: {aws_url}")
    return aws_url
