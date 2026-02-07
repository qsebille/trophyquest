from igdb import client

from ._format_igdb_game import format_igdb_game
from ._compute_match_score import compute_match_score

def fetch_candidates_for_psn_games(psn_games, twitch_client_id):
    """
    Search for games in IGDB API based on the title of games in the TrophyQuest database.
    Returns a list of games that match the specified criteria, along with links between PSN and IGDB, and orphan PSN games if no matches are found.

    :param psn_games: List of PSN games to search for matches
    :param twitch_client_id: Twitch client ID for authentication
    :return:
    """
    igdb_games = []
    candidates = []
    match_statuses = []

    for psn_game in psn_games:
        # Call IGDB API to search for candidates matching the title of the game
        psn_game_id, psn_game_title = psn_game[0], psn_game[1]
        search_results = client.search_games_by_title(search_query=psn_game_title,
                                                      twitch_client_id=twitch_client_id)
        print(f"Found {len(search_results)} matches for game: {psn_game_title}")

        # Formatting search results and adding match score
        psn_game_candidates = []
        for search_result in search_results:
            igdb_game_id, igdb_game = format_igdb_game(search_result)
            score = compute_match_score(psn_game_title, igdb_game['name'])
            psn_game_candidates.append((igdb_game_id, igdb_game, score))

        if len(psn_game_candidates) == 0:
            match_statuses.append({'psn_id': psn_game_id, 'igdb_id': None, 'status': 'NO_FOUND_CANDIDATE'})
        elif len(psn_game_candidates) == 1:
            igdb_game_id, igdb_game, score = psn_game_candidates[0]
            igdb_games.append(igdb_game)
            if score == 100:
                candidates.append(
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'score': score, 'status': 'AUTO_ACCEPTED'}
                )
                match_statuses.append(
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'status': 'MATCHED'}
                )
            else:
                candidates.append(
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'score': score, 'status': 'WAITING_VALIDATION'}
                )
        elif len(psn_game_candidates) > 1:
            igdb_games.extend([igdb_game for _, igdb_game, _ in psn_game_candidates])
            nb_exact_match = sum(score == 100 for _, _, score in psn_game_candidates)
            if nb_exact_match == 1:
                exact_match_index = psn_game_candidates.index(next(filter(lambda x: x[2] == 100, psn_game_candidates)))
                exact_match_id, exact_match_igdb_game, _ = psn_game_candidates[exact_match_index]

                candidates.append(
                    {'psn_id': psn_game_id, 'igdb_id': exact_match_id, 'score': 100, 'status': 'AUTO_ACCEPTED'}
                )
                candidates.extend(
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'score': score, 'status': 'AUTO_REJECTED'}
                    for igdb_game_id, _, score in psn_game_candidates if score != 100
                )
                match_statuses.append({'psn_id': psn_game_id, 'igdb_id': exact_match_id, 'status': 'MATCHED'})
            else:
                candidates.extend(
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'score': score, 'status': 'AUTO_REJECTED'}
                    for igdb_game_id, _, score in psn_game_candidates if score != 100
                )
                candidates.extend([
                    {'psn_id': psn_game_id, 'igdb_id': igdb_game_id, 'score': score, 'status': 'WAITING_VALIDATION'}
                    for igdb_game_id, _, score in psn_game_candidates
                ])
                match_statuses.extend([
                    {'psn_id': psn_game_id, 'igdb_id': None, 'status': 'VALIDATION_REQUIRED'}
                    for igdb_game_id, _, _ in psn_game_candidates
                ])

    return igdb_games, candidates, match_statuses
