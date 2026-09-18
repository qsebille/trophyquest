import logging
from dataclasses import dataclass

from sqlalchemy import text, Connection

from igdb_enricher.search_candidates.selection import CandidateSelectionResult, MatchStatus

logger = logging.getLogger(__name__)


@dataclass
class IgdbMatchingRow:
    suite_id: str
    matched_game_id: str | None
    status: str

    @staticmethod
    def compute(psn_suite_id: str, selection: list[CandidateSelectionResult]) -> 'IgdbMatchingRow':
        if not selection:
            match_status = "NO_MATCH_FOUND"
            match_id = None
        else:
            game_matched = next((s for s in selection if s.match_status == MatchStatus.MATCHED), None)
            match_status = "AUTO_MATCH" if game_matched else "UNCERTAIN"
            match_id = game_matched.candidate_id if game_matched else None
        logger.info(f"Added match: {match_status} between game {match_id} and suite {psn_suite_id})")
        return IgdbMatchingRow(
            suite_id=psn_suite_id,
            matched_game_id=match_id,
            status=match_status
        )


def insert_igdb_matching(conn: Connection, rows: IgdbMatchingRow):
    result = conn.execute(
        text("""
             INSERT INTO app.igdb_matching (suite_id, matched_game_id, status)
             VALUES (:suite_id, :matched_game_id, :status)
             ON CONFLICT (suite_id) DO NOTHING
             """),
        [{"suite_id": rows.suite_id, "matched_game_id": rows.matched_game_id, "status": rows.status}]
    )

    logger.info(f"Inserted {result.rowcount} igdb matching rows")
