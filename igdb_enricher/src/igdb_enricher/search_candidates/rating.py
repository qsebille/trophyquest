import re
import unicodedata
from dataclasses import dataclass

from igdb_enricher.search_candidates.finder.candidate_finder import CandidateSearchResult
from igdb_enricher.search_candidates.models.candidate import IgdbCandidate


@dataclass
class RatingResult:
    igdb_game_id: int
    score: float


def _f1_score(query_tokens: set[str], candidate_tokens: set[str]) -> float:
    intersection = len(query_tokens.intersection(candidate_tokens))
    precision = intersection / len(query_tokens)
    recall = intersection / len(candidate_tokens)
    f1_score = 0 if intersection == 0 else (2 * precision * recall) / (precision + recall)

    return f1_score


def _build_tokens(title: str) -> set[str]:
    title = title.lower().strip()
    title = unicodedata.normalize("NFKD", title)  # Unicode normalization
    title = "".join(ch for ch in title if not unicodedata.combining(ch))
    title = re.compile(r"[^a-z0-9]+").sub(" ", title)  # Alphanumeric normalization
    title = re.compile(r"\s+").sub(" ", title).strip()  # Trim + collapse whitespace
    return set(title.split())


@dataclass
class _CandidateRater:
    search_result: CandidateSearchResult

    def _rate_candidate(self, query: str, candidate: IgdbCandidate) -> RatingResult:
        # Base score : F1-score
        query_tokens = _build_tokens(query)
        candidate_tokens = _build_tokens(candidate.name)
        f1_score = _f1_score(query_tokens, candidate_tokens)

        # Score is affected by parent version
        parent_version = candidate.version_parent
        parent_version_coefficient = 1.0
        if parent_version is not None:
            parent_version_coefficient = 0.0 if parent_version in self.search_result.all_ids else 0.7

        # Score is affected by game type
        game_type = candidate.game_type
        game_type_coefficient = 1.0
        if game_type in ("Pack / Addon", "DLC"):
            game_type_coefficient *= 0.6

        final_score = (f1_score
                       * parent_version_coefficient
                       * game_type_coefficient)
        return RatingResult(igdb_game_id=candidate.id, score=final_score)

    def raw_rating(self):
        return [self._rate_candidate(self.search_result.title_raw, c) for c in self.search_result.candidates_raw]

    def clean_rating(self):
        return [self._rate_candidate(self.search_result.title_cleaned, c) for c in
                self.search_result.candidates_cleaned]

    def minimal_rating(self):
        return [self._rate_candidate(self.search_result.title_minimal, c) for c in
                self.search_result.candidates_minimal]


def rate_candidates(search_result: CandidateSearchResult) -> list[RatingResult]:
    rater = _CandidateRater(search_result)
    raw_rates = rater.raw_rating()
    clean_rates = rater.clean_rating()
    minimal_rates = rater.minimal_rating()

    return raw_rates + clean_rates + minimal_rates
