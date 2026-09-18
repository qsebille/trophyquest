import logging
from dataclasses import dataclass

from igdb_enricher.search_candidates.igdb_request import search_igdb_games
from igdb_enricher.search_candidates.models.candidate import IgdbCandidate

logger = logging.getLogger(__name__)


@dataclass
class CandidateSearchResult:
    title_raw: str
    title_cleaned: str
    title_minimal: str
    candidates_raw: list[IgdbCandidate]
    candidates_cleaned: list[IgdbCandidate]
    candidates_minimal: list[IgdbCandidate]

    @property
    def all_candidates(self) -> list[IgdbCandidate]:
        return self.candidates_raw + self.candidates_cleaned + self.candidates_minimal

    @property
    def all_ids(self) -> list[int]:
        return [c.id for c in self.all_candidates]


_STOP_WORDS = ["the", "a", "and", "of", "and", "to"]
_CONFUSING_WORDS = [
    "trophies", "trophy",
    "ultimate", "definitive", "collection", "edition"
]


def _remove_words_from_title(title: str, words: list[str]) -> str:
    clean_title_words = [word for word in title.lower().split() if word not in words]
    return " ".join(clean_title_words)


def find_candidates(title: str, platforms: list[str]) -> CandidateSearchResult:
    """
    For a given title, search for IGDB candidates.
    Performs multiple searches to find the best match.
    """
    # Search with raw title
    title_raw = title.lower()
    candidates_raw_json = search_igdb_games(title=title_raw, platforms=platforms)
    candidates_raw = [IgdbCandidate.from_dict(c) for c in candidates_raw_json]
    ids = set(c.id for c in candidates_raw)

    # Search without stop words
    clean_title = _remove_words_from_title(title=title, words=_STOP_WORDS)
    if clean_title != title_raw:
        candidates_cleaned_json = search_igdb_games(title=clean_title, platforms=platforms)
        candidates_cleaned = [IgdbCandidate.from_dict(c) for c in candidates_cleaned_json if c.get("id") not in ids]
        ids.update([c.id for c in candidates_cleaned])
    else:
        candidates_cleaned = []

    # Search without stop and confusing words like 'trophies', 'collection', ...
    minimal_title = _remove_words_from_title(title=title, words=_STOP_WORDS + _CONFUSING_WORDS)
    if minimal_title != clean_title:
        candidates_minimal_json = search_igdb_games(title=minimal_title, platforms=platforms)
        candidates_minimal = [IgdbCandidate.from_dict(c) for c in candidates_minimal_json if c.get("id") not in ids]
    else:
        candidates_minimal = []

    result = CandidateSearchResult(
        title_raw=title_raw,
        title_cleaned=clean_title,
        title_minimal=minimal_title,
        candidates_raw=candidates_raw,
        candidates_cleaned=candidates_cleaned,
        candidates_minimal=candidates_minimal,
    )

    logger.info(f"Found {len(result.all_candidates)} candidates")

    return result
