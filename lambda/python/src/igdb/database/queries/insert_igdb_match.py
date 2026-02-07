import postgres
from ._insert_candidates import insert_candidates
from ._insert_collections import insert_collections
from ._insert_companies import insert_companies
from ._insert_game_collections import insert_game_collections
from ._insert_game_companies import insert_game_companies
from ._insert_games import insert_games
from ._update_psn_games import update_psn_games_match_data


def insert_igdb_match(db_data):
    """
    Inserts and updates various data related to IGDB (Internet Game Database) into
    Postgres. This function processes multiple types of IGDB-related records, including
    collections, companies, games, game companies, game collections, candidates, and
    match statuses. It commits the changes to the database if all operations succeed,
    and rolls back in case of errors.

    :param db_data: A dictionary containing data to be inserted or updated. Keys in
        the dictionary represent specific record types (e.g., 'igdb_collections',
        'igdb_companies', 'igdb_games', etc.), and values are the corresponding data
        sets to be processed.
    :type db_data: dict
    :return: None. All operations are performed directly on the database.
    :rtype: None
    :raises Exception: If any operation fails during the database transaction, an
        exception is raised, and the transaction is rolled back.
    """
    connection = postgres.get_connection()
    try:
        nb_inserted_collections = insert_collections(db_data.get('igdb_collections'), connection)
        nb_inserted_companies = insert_companies(db_data.get('igdb_companies'), connection)
        nb_inserted_igdb_games = insert_games(db_data.get('igdb_games'), connection)
        nb_inserted_igdb_game_companies = insert_game_companies(db_data.get('igdb_game_companies'), connection)
        nb_inserted_igdb_game_collections = insert_game_collections(db_data.get('igdb_game_collections'), connection)
        nb_inserted_candidates = insert_candidates(db_data.get('candidates'), connection)
        nb_updated_psn_games = update_psn_games_match_data(db_data.get('match_statuses'), connection)

        connection.commit()

        print(f"Inserted {nb_inserted_collections} igdb_collection rows into Postgres")
        print(f"Inserted {nb_inserted_companies} igdb_company rows into Postgres")
        print(f"Inserted {nb_inserted_igdb_games} igdb_game rows into Postgres")
        print(f"Inserted {nb_inserted_igdb_game_companies} igdb_game_company rows into Postgres")
        print(f"Inserted {nb_inserted_igdb_game_collections} igdb_game_collection rows into Postgres")
        print(f"Inserted {nb_inserted_candidates} igdb_candidate rows into Postgres")
        print(f"Updated {nb_updated_psn_games} psn_game rows with match data")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()
