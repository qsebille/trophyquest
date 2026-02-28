import logging
import re
import uuid

import postgres
from images.s3_upload import upload_image_to_aws


def get_unuploaded_igdb_images(limit: int, connection):
    """Get IGDB images that have not been uploaded to AWS S3.

    Args:
        limit (int): Maximum number of records to fetch.
        connection: Database connection object.

    Returns:
        List of tuples containing IGDB image details.
    """
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT ig.id, ig.name, i.image_type, i.igdb_url
            FROM app.igdb_image i
                JOIN app.igdb_game ig on i.igdb_game_id = ig.id
            WHERE i.aws_url IS NULL
            LIMIT {limit};
            """

    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()


def upload_igdb_image_to_s3(record, bucket_name, s3_client):
    """
    Upload IGDB image to AWS S3 and update database with the URL.

    :param record: IGDB image details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    """
    logger = logging.getLogger(__name__)
    igdb_id, igdb_name, igdb_type, igdb_url = record
    logger.info(f"Processing IGDB image {igdb_url}")

    name_slug = re.sub(r'[^a-z0-9]+', '-', igdb_name.lower()).strip('-')
    image_uuid = uuid.uuid5(uuid.NAMESPACE_URL, igdb_url)
    s3_path = f"igdb/{name_slug}_{igdb_id}/{igdb_type}/{image_uuid}"
    aws_url = upload_image_to_aws(igdb_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
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
