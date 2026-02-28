import logging
import re

import postgres
from images.upload import upload_image_to_aws


def select_game_image(limit: int, connection):
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            select pgi.id, pgi.psn_url, pgi.type, pg.name, pg.id 
                from app.psn_game_image pgi
                    left join app.psn_game pg on pg.id = pgi.psn_game_id
                where pgi.aws_url is null
            limit {limit};
            """

    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()


def process_game_image(record, bucket_name, s3_client):
    logger = logging.getLogger(__name__)
    image_id, psn_url, image_type, game_name, game_id = record
    logger.info(f"Processing image {image_id}: {psn_url} (game: {game_name})")

    if not game_name:
        logger.warning(f"Game name is null for image {image_id}, using default name")
        game_name = f"game-{game_id}"

    game_name_slug = re.sub(r'[^a-z0-9]+', '-', game_name.lower()).strip('-')
    s3_path = f"psn-game-image/{game_name_slug}_{game_id}/{image_type}/{image_id}"
    aws_url = upload_image_to_aws(psn_url, s3_path, s3_client, bucket_name)

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
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
        logger.info(f"Database updated and committed for image {image_id}")
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        pg_conn_thread.rollback()
        raise
    finally:
        pg_conn_thread.close()

    logger.info(f"Image {image_id} uploaded to AWS with URL: {aws_url}")
    return aws_url
