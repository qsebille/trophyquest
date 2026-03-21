import logging

import pg8000


def fetch_unuploaded_igdb_images(limit: int, connection: pg8000.Connection):
    """
    Get IGDB images that have not been uploaded to AWS S3.

    :param limit: Maximum number of records to fetch.
    :param connection: Database connection object.
    :return: List of tuples containing IGDB image details.
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
        images = cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()

    logger.info(f"Fetched {len(images)} unuploaded IGDB images")
    return images
