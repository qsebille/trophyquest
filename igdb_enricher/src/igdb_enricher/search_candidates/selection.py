import logging
from dataclasses import dataclass
from enum import Enum

from igdb_enricher.search_candidates.rating import RatingResult

logger = logging.getLogger(__name__)


class MatchStatus(Enum):
    MATCHED = "matched"
    DISCARDED = "discarded"
    UNCERTAIN = "uncertain"


class _MatchQuality(Enum):
    PERFECT = "perfect"
    GOOD = "good"
    MEDIUM = "medium"
    POOR = "poor"


def _get_quality(score: float) -> _MatchQuality:
    if score == 1.0:
        return _MatchQuality.PERFECT
    elif score >= 0.85:
        return _MatchQuality.GOOD
    else:
        return _MatchQuality.POOR


@dataclass
class CandidateSelectionResult:
    candidate_id: int
    match_status: MatchStatus
    score: float


def select_candidates(rates: list[RatingResult]) -> list[CandidateSelectionResult]:
    if len(rates) == 0:
        return []

    if len(rates) == 1:
        candidate = rates[0]
        match_status = MatchStatus.MATCHED if candidate.score >= 0.9 else MatchStatus.UNCERTAIN
        return [CandidateSelectionResult(candidate_id=candidate.igdb_game_id,
                                         match_status=match_status,
                                         score=candidate.score)]

    # When multiple candidates are found, we need to decide which one to select
    perfect_matches = [c for c in rates if _get_quality(c.score) == _MatchQuality.PERFECT]
    good_matches = [c for c in rates if _get_quality(c.score) == _MatchQuality.GOOD]
    poor_matches = [c for c in rates if _get_quality(c.score) == _MatchQuality.POOR]

    logger.info(f"Found {len(perfect_matches)} perfect match")
    logger.info(f"Found {len(good_matches)} good match")
    logger.info(f"Found {len(poor_matches)} poor match")

    if len(perfect_matches) == 1:
        selected_candidate = perfect_matches[0]
        matched = CandidateSelectionResult(candidate_id=selected_candidate.igdb_game_id,
                                           match_status=MatchStatus.MATCHED,
                                           score=selected_candidate.score)
        discarded = [
            CandidateSelectionResult(candidate_id=c.igdb_game_id,
                                     match_status=MatchStatus.DISCARDED,
                                     score=c.score)
            for c in good_matches + poor_matches
        ]
        return [matched] + discarded

    if len(good_matches) == 1:
        selected_candidate = good_matches[0]
        matched = CandidateSelectionResult(candidate_id=selected_candidate.igdb_game_id,
                                           match_status=MatchStatus.MATCHED,
                                           score=selected_candidate.score)
        discarded = [
            CandidateSelectionResult(candidate_id=c.igdb_game_id,
                                     match_status=MatchStatus.DISCARDED,
                                     score=c.score)
            for c in + poor_matches
        ]
        return [matched] + discarded
    else:
        return [
            CandidateSelectionResult(candidate_id=candidate.igdb_game_id,
                                     match_status=MatchStatus.UNCERTAIN,
                                     score=candidate.score)
            for candidate in rates]
