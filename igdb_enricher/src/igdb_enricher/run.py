import logging

import dotenv

from igdb_enricher.config.postgres import TrophyQuestPostgresConfig
from igdb_enricher.search_candidates.fetcher import find_candidates
from igdb_enricher.search_candidates.rating import rate_candidates
from igdb_enricher.search_candidates.selection import select_candidates
from igdb_enricher.trophyquest.igdb_candidate import IgdbCandidateRow, insert_candidates
from igdb_enricher.trophyquest.igdb_collection import IgdbCollectionRow, insert_collections
from igdb_enricher.trophyquest.igdb_company import IgdbCompanyRow, insert_companies
from igdb_enricher.trophyquest.igdb_game import IgdbGameRow, insert_games
from igdb_enricher.trophyquest.igdb_matching import IgdbMatchingRow, insert_igdb_matching
from igdb_enricher.trophyquest.igdb_screenshot import IgdbScreenshotRow, insert_screenshots
from igdb_enricher.trophyquest.search import search_unlinked_suites

logger = logging.getLogger(__name__)


def run_igdb_enricher(suite_limit: int):
    logger.info("Starting IGDB enricher")
    # Config
    dotenv.load_dotenv()
    tq_engine = TrophyQuestPostgresConfig().engine

    # Fetch trophy suites to associate
    unlinked_trophy_suites_df = search_unlinked_suites(engine=tq_engine, limit=suite_limit)
    if len(unlinked_trophy_suites_df) == 0:
        logger.info(f"No unlinked trophy suites found")
        return

    logger.info(f"Found {len(unlinked_trophy_suites_df)} unlinked trophy suites")

    # Fetch candidates for each game
    for suite in unlinked_trophy_suites_df.itertuples():
        logger.info(f"Starting candidate search for suite {suite.name} ({suite.id})")
        search_result = find_candidates(title=suite.name, platforms=suite.platforms)
        rates = rate_candidates(search_result=search_result)
        selection = select_candidates(rates=rates)

        igdb_game_rows = [IgdbGameRow.build(candidate) for candidate in search_result.all_candidates]
        igdb_candidate_rows = [IgdbCandidateRow.build(suite_id=suite.id, selection=s) for s in selection]
        igdb_matching_row = IgdbMatchingRow.compute(suite.id, selection)

        igdb_collection_rows = set()
        igdb_company_rows = set()
        igdb_screenshot_rows = []
        for candidate in search_result.all_candidates:
            igdb_collection_rows.update(set([IgdbCollectionRow.build(c) for c in candidate.collections]))
            igdb_company_rows.update(set([IgdbCompanyRow.build(c) for c in candidate.companies]))
            igdb_screenshot_rows = [
                IgdbScreenshotRow.build(candidate.id, screen_id)
                for screen_id in candidate.screenshot_ids
            ]

        with tq_engine.begin() as conn:
            insert_collections(conn=conn, rows=list(igdb_collection_rows))
            insert_companies(conn=conn, rows=list(igdb_company_rows))
            insert_games(conn=conn, games=list(igdb_game_rows))
            insert_candidates(conn=conn, candidates=list(igdb_candidate_rows))
            insert_screenshots(conn=conn, rows=list(igdb_screenshot_rows))
            insert_igdb_matching(conn=conn, rows=igdb_matching_row)

    logger.info("IGDB Enricher ended successfully")
