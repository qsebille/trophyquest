import logging

from igdb_enricher.postgres.connection import get_postgres_connection


def get_psn_games_with_pending_match_status(nb_game_to_select=20) -> list:
    logger = logging.getLogger(__name__)
    connection = get_postgres_connection()
    cursor = connection.cursor()
    query = f"""
            select g.id, g.name
            from app.psn_game g
            where g.igdb_match_status = 'PENDING'
            order by g.id
            limit {nb_game_to_select};
            """

    try:
        cursor.execute(query)
        games = cursor.fetchall()
        logger.info(f"Fetched {len(games)} games with pending match status")
        return games
    except Exception as e:
        logger.error(f"Error executing query: {query}", e)
        raise
    finally:
        try:
            cursor.close()
        finally:
            connection.close()
