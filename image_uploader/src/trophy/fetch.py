import logging

import pg8000


def fetch_unuploaded_trophy_icons(limit: int, connection: pg8000.Connection) -> list[tuple]:
    """
    Get trophy icons that have not been uploaded to AWS S3.

    :param limit: Maximum number of records to fetch.
    :param connection: Database connection object.
    :return: List of tuples containing trophy icon details.
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
        icons = cursor.fetchall()
    except Exception as e:
        logger.error(f"Error executing query: {query}: {e}")
        raise
    finally:
        cursor.close()

    logger.info(f"Fetched {len(icons)} unuploaded trophy icons")
    return icons
