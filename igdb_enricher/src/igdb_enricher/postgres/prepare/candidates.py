import logging

from igdb_enricher.candidate.result import CandidateResultingProcess


def prepare_candidates(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)
    candidates = set()

    for candidate in [c for process_output in processed_candidates for c in process_output.candidate_list]:
        candidates.add((candidate["psn_id"], candidate["igdb_id"], candidate["score"], candidate["status"]))

    logger.info(f"Prepared {len(candidates)} match status elements")

    return candidates
