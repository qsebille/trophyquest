import logging

from igdb_enricher.candidate.result import CandidateResultingProcess


def prepare_collections(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)

    collections = set()
    candidate_collection_links = set()

    for game in [c for process_output in processed_candidates for c in process_output.igdb_game_list]:
        current_collections = game.get("collections", [])
        collections.update(
            (collection.get("id"), collection.get("name"))
            for collection in current_collections
            if collection.get("id") is not None and collection.get("name") is not None
        )
        candidate_collection_links.update(
            (game.get("id"), collection.get("id"))
            for collection in current_collections
            if collection.get("id") is not None
        )

    logger.info(
        f"Found {len(collections)} collections and {len(candidate_collection_links)} candidate collection links")

    return list(collections), list(candidate_collection_links)
