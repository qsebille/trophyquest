import logging
from dataclasses import dataclass

from sqlalchemy import Connection, text

from igdb_enricher.search_candidates.selection import CandidateSelectionResult

logger = logging.getLogger(__name__)


@dataclass
class IgdbCandidateRow:
    suite_id: str
    candidate_id: int
    score: float
    status: str

    @classmethod
    def build(cls, suite_id: str, selection: CandidateSelectionResult):
        return cls(
            suite_id=suite_id,
            candidate_id=selection.candidate_id,
            score=selection.score,
            status=selection.match_status.name,
        )


def insert_candidates(conn: Connection, candidates: list[IgdbCandidateRow]):
    if not candidates:
        logger.info("No candidates to insert")
        return

    result = conn.execute(
        text("""
             INSERT INTO app.igdb_candidate (suite_id, candidate_id, score, status)
             VALUES (:suite_id, :candidate_id, :score, :status)
             ON CONFLICT (suite_id, candidate_id) DO NOTHING
             """),
        [
            {"suite_id": candidate.suite_id,
             "candidate_id": candidate.candidate_id,
             "score": candidate.score,
             "status": candidate.status}
            for candidate in candidates
        ],
    )

    logger.info(f"Inserted {result.rowcount} candidates")
