import logging
import re
import uuid

from botocore.client import BaseClient

from image_uploader.src.postgres.connection import get_postgres_connection
from image_uploader.src.utils.aws import upload_image_to_aws


def upload_igdb_image_to_s3(
        record: tuple,
        bucket_name: str,
        s3_client: BaseClient
) -> str:
    """
    Upload IGDB image to AWS S3 and update the database with the URL.

    :param record: IGDB image details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    :return: AWS URL of the uploaded image.
    """
    logger = logging.getLogger(__name__)
    igdb_id, igdb_name, igdb_type, igdb_url = record
    logger.info(f"Processing IGDB image. ID:{igdb_id}, URL:{igdb_url}, TYPE:{igdb_type}, NAME:{igdb_name}")

    name_slug = re.sub(r'[^a-z0-9]+', '-', igdb_name.lower()).strip('-')
    image_uuid = uuid.uuid5(uuid.NAMESPACE_URL, igdb_url)
    s3_path = f"igdb/{name_slug}_{igdb_id}/{igdb_type}/{image_uuid}"
    aws_url = upload_image_to_aws(igdb_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = get_postgres_connection()
    cursor = pg_conn_thread.cursor()
    query = """
            UPDATE app.igdb_image
            SET aws_url = %s
            WHERE igdb_url = %s;
            """
    try:
        logger.info(f"Updating database for IGDB image {igdb_id} with url {aws_url}")
        cursor.execute(query, (aws_url, igdb_url))
        pg_conn_thread.commit()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Image of IGDB game {igdb_id} uploaded to AWS with URL: {aws_url}")
    return aws_url
