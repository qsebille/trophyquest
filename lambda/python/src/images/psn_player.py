import logging
import re

import postgres
from images.upload import upload_image_to_aws


def select_player_image(limit: int, connection):
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT p.id, p.psn_avatar_url, p.pseudo 
                FROM app.psn_player p
                WHERE p.psn_avatar_url IS NULL
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


def process_player_avatar(record, bucket_name, s3_client):
    logger = logging.getLogger(__name__)
    player_id, psn_url, pseudo = record
    logger.info(f"Processing image {player_id}: {psn_url}")

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
        cursor.execute(query, (aws_url, player_id))
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Avatar for player {pseudo} uploaded to AWS with URL: {aws_url}")
    return aws_url
