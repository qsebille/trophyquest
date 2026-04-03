import logging

from igdb_enricher.candidate.format import format_igdb_game
from igdb_enricher.candidate.result import CandidateResultingProcess
from igdb_enricher.candidate.score import compute_match_score
from igdb_enricher.candidate.search import search_candidates_for_title


def process_candidates_for_game(psn_game: tuple, twitch_client_id: str) -> CandidateResultingProcess:
    logger = logging.getLogger(__name__)
    psn_game_id, psn_game_title = psn_game
    logger.info(f"Processing game: {psn_game_title}")

    candidates_raw = search_candidates_for_title(psn_game_title, twitch_client_id)
    logger.info(f"Found {len(candidates_raw)} candidates for game: {psn_game_title}")

    candidates = []
    for candidate in candidates_raw:
        formatted_candidate = format_igdb_game(candidate)
        match_score = compute_match_score(psn_game_title, formatted_candidate['name'])
        logger.info(f"Candidate: {formatted_candidate['name']}, Score: {match_score}")
        candidates.append((formatted_candidate['id'], formatted_candidate, match_score))

    if len(candidates) == 0:
        return CandidateResultingProcess(
            igdb_game_list=[],
            candidate_list=[],
            match_status={
                'psn_id': psn_game_id,
                'igdb_id': None,
                'status': 'NO_FOUND_CANDIDATE',
            }
        )

    elif len(candidates) == 1:
        igdb_game_id, igdb_game, score = candidates[0]
        return CandidateResultingProcess(
            igdb_game_list=[igdb_game],
            candidate_list=[{
                'psn_id': psn_game_id,
                'igdb_id': igdb_game_id,
                'score': score,
                'status': 'AUTO_ACCEPTED' if score == 100 else 'WAITING_VALIDATION'
            }],
            match_status={
                'psn_id': psn_game_id,
                'igdb_id': igdb_game_id if score == 100 else None,
                'status': 'MATCHED' if score == 100 else 'VALIDATION_REQUIRED'
            }
        )

    else:
        nb_exact_match = sum(score == 100 for _, _, score in candidates)
        if nb_exact_match == 1:
            return CandidateResultingProcess(
                igdb_game_list=[igdb_game for _, igdb_game, _ in candidates],
                candidate_list=[{
                    'psn_id': psn_game_id,
                    'igdb_id': igdb_game_id,
                    'score': score,
                    'status': 'AUTO_ACCEPTED' if score == 100 else 'AUTO_REJECTED'
                } for igdb_game_id, _, score in candidates],
                match_status={
                    'psn_id': psn_game_id,
                    'igdb_id': None,
                    'status': 'VALIDATION_REQUIRED'
                }
            )
        else:
            return CandidateResultingProcess(
                igdb_game_list=[igdb_game for _, igdb_game, _ in candidates],
                candidate_list=[{
                    'psn_id': psn_game_id,
                    'igdb_id': igdb_game_id,
                    'score': score,
                    'status': 'WAITING_VALIDATION'
                } for igdb_game_id, _, score in candidates],
                match_status={
                    'psn_id': psn_game_id,
                    'igdb_id': None,
                    'status': 'VALIDATION_REQUIRED'
                }
            )
