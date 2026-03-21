import logging

from igdb_enricher.candidate.result import CandidateResultingProcess


def prepare_companies(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)
    companies = set()
    candidate_company_links = set()

    for game in [c for process_output in processed_candidates for c in process_output.igdb_game_list]:
        developers = game.get("developers", [])
        publishers = game.get("publishers", [])

        companies.update(
            (company.get("id"), company.get("name"), company.get("country"))
            for company in developers + publishers
            if company.get("id") is not None and company.get("name") is not None
        )
        candidate_company_links.update(
            (game.get("id"), company.get("id"), "developer")
            for company in developers
            if company.get("id") is not None
        )
        candidate_company_links.update(
            (game.get("id"), company.get("id"), "publisher")
            for company in publishers
            if company.get("id") is not None
        )

    logger.info(f"Found {len(companies)} companies and {len(candidate_company_links)} candidate company links")

    return list(companies), list(candidate_company_links)
