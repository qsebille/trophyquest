import logging
import re

import postgres
from images.s3_upload import upload_image_to_aws


def get_unuploaded_player_avatars(limit: int, connection):
    """Get player avatars that have not been uploaded to AWS S3.

    Args:
        limit (int): Maximum number of records to fetch.
        connection: Database connection object.

    Returns:
        List of tuples containing player avatar details.
    """
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT p.id, p.psn_avatar_url, p.pseudo 
                FROM app.psn_player p
                WHERE p.aws_avatar_url IS NULL
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


def upload_player_avatar_to_s3(record, bucket_name, s3_client):
    """
    Upload player avatar to AWS S3 and update database with the URL.

    :param record: Player avatar details.
    :param bucket_name: Name of the S3 bucket.
    :param s3_client: S3 client object.
    """
    logger = logging.getLogger(__name__)
    player_id, psn_url, pseudo = record
    logger.info(f"Processing image {player_id}: {psn_url} (pseudo: {pseudo})")

    if not pseudo:
        logger.warning(f"Pseudo is null for player {player_id}, using default name")
        pseudo = f"player-{player_id}"

    player_slug = re.sub(r'[^a-z0-9]+', '-', pseudo.lower()).strip('-')
    s3_path = f"psn-player/{player_slug}_{player_id}"
    aws_url = upload_image_to_aws(psn_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
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
