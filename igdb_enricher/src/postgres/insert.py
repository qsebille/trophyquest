import logging

from igdb_enricher.src.candidate.result import CandidateResultingProcess
from igdb_enricher.src.postgres.connection import get_postgres_connection
from igdb_enricher.src.postgres.insert_queries import get_insert_query, InsertQueryTypes
from igdb_enricher.src.postgres.prepare.candidates import prepare_candidates
from igdb_enricher.src.postgres.prepare.collections import prepare_collections
from igdb_enricher.src.postgres.prepare.companies import prepare_companies
from igdb_enricher.src.postgres.prepare.games import prepare_games
from igdb_enricher.src.postgres.prepare.images import prepare_images


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
        match_status_placeholders = []
        for e in processed_candidates:
            igdb_id = e.match_status["igdb_id"] if e.match_status["igdb_id"] is not None else "NULL"
            psn_id = e.match_status["psn_id"]
            status = e.match_status["status"]
            match_status_placeholders.append(f"('{psn_id}'::uuid, {igdb_id}::bigint, '{status}')")
        update_query = f"""
            UPDATE app.psn_game g
            SET igdb_match_status = v.status, igdb_game_id = v.igdb_id
            FROM (values {', '.join(match_status_placeholders)}) as v(id, igdb_id, status)
            WHERE g.id = v.id;
        """
        cursor.execute(update_query)

        connection.commit()
    except Exception as e:
        logger.error(f"Error inserting data into Postgres: {e}")
        connection.rollback()
        raise
    finally:
        cursor.close()
        connection.close()

    logger.info("Insertion data into Postgres completed")
