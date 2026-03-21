import logging

import pg8000


def fetch_unuploaded_game_images(limit: int, connection: pg8000.Connection) -> list[tuple]:
    """
    Get PSN game images that have not been uploaded to AWS S3.

    :param limit: Maximum number of records to fetch.
    :param connection: Database connection object.
    :return: List of tuples containing game image details.
    """
    logger = logging.getLogger(__name__)
    cursor = connection.cursor()
    query = f"""
            SELECT pgi.id, pgi.psn_url, pgi.type, pg.name, pg.id 
                FROM app.psn_game_image pgi
                    LEFT JOIN app.psn_game pg ON pg.id = pgi.psn_game_id
                WHERE pgi.aws_url IS NULL
            LIMIT {limit};
            """

    try:
        cursor.execute(query)
        images = cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()

    logger.info(f"Fetched {len(images)} unuploaded game images")
    return images
