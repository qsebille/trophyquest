import logging
import re

import postgres
from images.s3_upload import upload_image_to_aws


def get_unuploaded_trophy_icons(limit: int, connection):
    """Get trophy icons that have not been uploaded to AWS S3.

    Args:
        limit (int): Maximum number of records to fetch.
        connection: Database connection object.

    Returns:
        List of tuples containing trophy icon details.
    """
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT DISTINCT ON (t.id)
                t.id, t.psn_icon_url, t.rank, ts.id, g.name, g.id
            FROM app.psn_trophy t
                JOIN app.psn_trophy_suite ts ON ts.id = t.trophy_suite_id
                JOIN app.psn_edition_trophy_suite ets ON ets.trophy_suite_id = ts.id
                JOIN app.psn_edition e ON e.id = ets.edition_id
                JOIN app.psn_game g ON g.id = e.psn_game_id
            WHERE t.aws_icon_url IS NULL
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


def upload_trophy_icon_to_s3(record, bucket_name, s3_client):
    """
    Upload trophy icon to AWS S3 and update database with the URL.

    :param record: Trophy icon details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    """
    logger = logging.getLogger(__name__)
    trophy_id, icon_url, rank, ts_id, game_name, game_id = record
    logger.info(f"Processing trophy icon {icon_url}")

    game_name_slug = re.sub(r'[^a-z0-9]+', '-', game_name.lower()).strip('-')
    s3_path = f"psn-trophy/{game_name_slug}_{game_id}/{ts_id}/{rank}_{trophy_id}"
    aws_url = upload_image_to_aws(icon_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
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
