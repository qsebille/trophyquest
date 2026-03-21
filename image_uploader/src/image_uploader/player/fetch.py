import logging

import pg8000


def fetch_unuploaded_player_avatars(limit: int, connection: pg8000.Connection) -> list[tuple]:
    """
    Get player avatars that have not been uploaded to AWS S3.

    :param limit: Maximum number of records to fetch.
    :param connection: Database connection object.
    :return: List of tuples containing player avatar details.
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
        avatars = cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()

    logger.info(f"Fetched {len(avatars)} unuploaded player avatars")
    return avatars
