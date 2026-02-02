import os

import dotenv

import postgres
from igdb import app
from igdb import candidate
from igdb import client
from igdb.database import queries


def run_enricher(nb_game_to_match=2):
    dotenv.load_dotenv()
    twitch_client_id = os.environ["TWITCH_CLIENT_ID"]

    unmapped_games = queries.select_unmapped_games(nb_game_to_match)
    if len(unmapped_games) == 0:
        print("No unmapped games found in Postgres.")
        return

    app_candidates = []
    igdb_games = []
    for game in unmapped_games:
        game_id, game_title = game[0], game[1]
        igdb_game_search_result = client.search_games_by_title(search_query=game_title,
                                                               twitch_client_id=twitch_client_id)
        print(f"Found {len(igdb_game_search_result)} matches for game: {game_title}")
        for search_result_element in igdb_game_search_result:
            igdb_game = candidate.format_candidate(search_result_element, game_title)
            candidate_id = igdb_game.get("id")
            score = candidate.compute_score(game_title, igdb_game["name"])
            app_candidates.append((game_id, candidate_id, score, 'PENDING'))
            igdb_games.append(igdb_game)

    app_collections = app.build_app_collections(igdb_games)
    app_companies = app.build_app_companies(igdb_games)
    app_games = app.build_app_games(igdb_games)
    app_game_companies = app.build_app_game_companies(igdb_games)
    app_game_collections = app.build_app_game_collections(igdb_games)

    connection = postgres.get_connection()
    # Persists game data transactionally; rolls back on error
    try:
        inserted_collections = queries.insert_collections(connection, app_collections)
        inserted_companies = queries.insert_companies(connection, app_companies)
        inserted_igdb_games = queries.insert_games(connection, app_games)
        inserted_igdb_game_companies = queries.insert_game_companies(connection, app_game_companies)
        inserted_igdb_game_collections = queries.insert_game_collections(connection, app_game_collections)
        inserted_candidates = queries.insert_candidates(connection, app_candidates)

        connection.commit()

        print(f"Inserted {inserted_collections} igdb_collection rows into Postgres")
        print(f"Inserted {inserted_companies} igdb_company rows into Postgres")
        print(f"Inserted {inserted_igdb_games} igdb_game rows into Postgres")
        print(f"Inserted {inserted_igdb_game_companies} igdb_game_company rows into Postgres")
        print(f"Inserted {inserted_igdb_game_collections} igdb_game_collection rows into Postgres")
        print(f"Inserted {inserted_candidates} igdb_candidate rows into Postgres")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    run_enricher()
