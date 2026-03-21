import logging

from igdb_enricher.candidate.result import CandidateResultingProcess


def prepare_games(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)
    games = []

    for game in [game for process_output in processed_candidates for game in process_output.igdb_game_list]:
        game_id = game.get("id")
        name = game.get("name")
        summary = game.get("summary")
        game_type = game.get("game_type", {'type': 'Unknown'}).get('type', 'Unknown')
        release_date = game.get("release_date")
        genres = game.get("genres", [])
        themes = game.get("themes", [])
        psn_website = game.get("psn_website")
        official_website = game.get("official_website")
        community_wiki_website = game.get("community_wiki_website")
        youtube_ids = game.get("youtube_ids", [])

        games.append((
            game_id,
            name,
            summary,
            game_type,
            release_date,
            genres,
            themes,
            psn_website,
            official_website,
            community_wiki_website,
            youtube_ids,
        ))

    logger.info(f"Prepared {len(games)} games")

    return games
