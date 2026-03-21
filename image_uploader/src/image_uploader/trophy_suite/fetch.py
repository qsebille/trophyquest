import logging

import pg8000


def fetch_unuploaded_trophy_suite_images(limit: int, connection: pg8000.Connection) -> list[tuple]:
    """
    Get trophy suite images that have not been uploaded to AWS S3.

    :param limit: Maximum number of records to fetch.
    :param connection: Database connection object.
    :return: List of tuples containing trophy suite image details.
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
        images = cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()

    logger.info(f"Fetched {len(images)} unuploaded trophy suite images")
    return images
