import logging
import re

import postgres
from images.s3_upload import upload_image_to_aws


def get_unuploaded_trophy_suite_images(limit: int, connection):
    """Get trophy suite images that have not been uploaded to AWS S3.

    Args:
        limit (int): Maximum number of records to fetch.
        connection: Database connection object.

    Returns:
        List of tuples containing trophy suite image details.
    """
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT ts.id, ts.psn_image_url, ts.name
            FROM app.psn_trophy_suite ts
            WHERE ts.aws_image_url IS NULL
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


def upload_trophy_suite_image_to_s3(record, bucket_name, s3_client):
    """
    Upload trophy suite image to AWS S3 and update database with the URL.

    :param record: Trophy suite image details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    """
    logger = logging.getLogger(__name__)
    ts_id, ts_name, ts_url = record
    logger.info(f"Processing trophy suite image {ts_url}")

    name_slug = re.sub(r'[^a-z0-9]+', '-', ts_name.lower()).strip('-')
    s3_path = f"psn-trophy-suite/{name_slug}_{ts_id}"
    aws_url = upload_image_to_aws(ts_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
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
