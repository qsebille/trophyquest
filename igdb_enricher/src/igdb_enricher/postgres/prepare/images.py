import logging

from igdb_enricher.candidate.result import CandidateResultingProcess


def prepare_images(processed_candidates: list[CandidateResultingProcess]):
    logger = logging.getLogger(__name__)
    images = []

    for game in [c for process_output in processed_candidates for c in process_output.igdb_game_list]:
        images.extend(
            {'igdb_id': game.get("id"), 'url': image.get("url"), 'image_type': image.get("type")}
            for image in game.get("images", [])
        )

    logger.info(f"Prepared {len(images)} images")

    return images
