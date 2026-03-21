import logging

from igdb_enricher.candidate.result import CandidateResultingProcess
from igdb_enricher.postgres.connection import get_postgres_connection
from igdb_enricher.postgres.insert_queries import get_insert_query, InsertQueryTypes
from igdb_enricher.postgres.prepare.candidates import prepare_candidates
from igdb_enricher.postgres.prepare.collections import prepare_collections
from igdb_enricher.postgres.prepare.companies import prepare_companies
from igdb_enricher.postgres.prepare.games import prepare_games
from igdb_enricher.postgres.prepare.images import prepare_images


def insert_into_postgres(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)

    logger.info(f"Preparing data for insertion into Postgres: {len(processed_candidates)} candidates")
    collections, game_collections = prepare_collections(processed_candidates)
    companies, game_companies = prepare_companies(processed_candidates)
    games = prepare_games(processed_candidates)
    images = prepare_images(processed_candidates)
    candidates = prepare_candidates(processed_candidates)

    logger.info("Starting insertion data into Postgres")
    connection = get_postgres_connection()
    cursor = connection.cursor()
    try:
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_GAMES), games)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_IMAGES), images)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_COLLECTIONS), collections)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_GAME_COLLECTIONS), game_collections)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_COMPANIES), companies)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_GAME_COMPANIES), game_companies)
        cursor.executemany(get_insert_query(InsertQueryTypes.INSERT_CANDIDATES), candidates)

        # Update PSN game
        for e in processed_candidates:
            igdb_id = e.match_status["igdb_id"]
            psn_id = e.match_status["psn_id"]
            status = e.match_status["status"]

            update_query = """
                           UPDATE app.psn_game
                           SET igdb_match_status = %s,
                               igdb_game_id      = %s
                           WHERE id = %s; \
                           """
            cursor.execute(update_query, (status, igdb_id, psn_id))

        connection.commit()
    except Exception as e:
        logger.error(f"Error inserting data into Postgres: {e}")
        connection.rollback()
        raise
    finally:
        cursor.close()
        connection.close()

    logger.info("Insertion data into Postgres completed")
