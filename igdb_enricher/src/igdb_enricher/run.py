import logging
import os

import dotenv

from igdb_enricher.candidate.process import process_candidates_for_game
from igdb_enricher.postgres.fetch import get_psn_games_with_pending_match_status
from igdb_enricher.postgres.insert import insert_into_postgres


def run_enricher(nb_game_to_match=50):
    """Enriches pending PSN games with IGDB matches using Twitch API"""
    logger = logging.getLogger(__name__)
    dotenv.load_dotenv()
    twitch_client_id = os.environ["TWITCH_CLIENT_ID"]

    pending_games = get_psn_games_with_pending_match_status(nb_game_to_match)
    if len(pending_games) == 0:
        logger.info("No pending games found in TrophyQuest database. Exiting.")
        return

    processed_candidates = [
        process_candidates_for_game(psn_game=psn_game, twitch_client_id=twitch_client_id)
        for psn_game in pending_games
    ]

    insert_into_postgres(processed_candidates=processed_candidates)


if __name__ == "__main__":
    run_enricher()
