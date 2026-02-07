import os

import dotenv

from igdb import process
from igdb.database import queries, data as data_builder


def run_enricher(nb_game_to_match=10):
    dotenv.load_dotenv()
    twitch_client_id = os.environ["TWITCH_CLIENT_ID"]

    pending_games = queries.select_psn_games_with_pending_match_status(nb_game_to_match)
    if len(pending_games) == 0:
        print("No pending games found in TrophyQuest database. Exiting.")
        return

    print(f"Processing {len(pending_games)} pending games...")
    igdb_games, candidates, match_statuses = process.fetch_candidates_for_psn_games(pending_games, twitch_client_id)
    db_data = data_builder.build_db_data(igdb_games, candidates, match_statuses)

    queries.insert_igdb_match(db_data)


if __name__ == "__main__":
    run_enricher()
