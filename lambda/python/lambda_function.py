import logging

from igdb.main import run_enricher
from images.main import run_image_uploader


def setup_logging():
    # Setup logging correctly for Lambda
    logger = logging.getLogger()
    if logger.handlers:
        for handler in logger.handlers:
            handler.setFormatter(logging.Formatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(aws_request_id)s\t%(name)s\t%(message)s\n",
                "%Y-%m-%dT%H:%M:%S"))
    logger.setLevel(logging.INFO)


def image_uploader_handler(event, context):
    setup_logging()
    logger = logging.getLogger(__name__)
    logger.info(f"Received event for image uploader: {event}")
    try:
        game_image_limit = int(event.get("game_image_limit", 10))
        player_limit = int(event.get("player_limit", 10))
        results = run_image_uploader(game_image_limit=game_image_limit, player_limit=player_limit)
        logger.info(f"Successfully processed {len(results)} images.")
    except Exception as e:
        logger.error(f"Fatal error in image_uploader_handler: {e}", exc_info=True)
        raise


def igdb_handler(event, context):
    nb_game_to_match = int(event.get("limit", 20))

    return run_enricher(nb_game_to_match)
