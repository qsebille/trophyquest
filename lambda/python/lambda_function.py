import logging

from igdb.main import run_enricher
from images.main import run_image_uploader


def setup_logging_lambda():
    logger = logging.getLogger()
    if logger.handlers:
        for handler in logger.handlers:
            handler.setFormatter(logging.Formatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(aws_request_id)s\t%(name)s\t%(message)s\n",
                "%Y-%m-%dT%H:%M:%S"))
    logger.setLevel(logging.INFO)


def image_uploader_handler(event, context):
    setup_logging_lambda()
    logger = logging.getLogger(__name__)
    logger.info(f"Received event for image uploader: {event}")
    try:
        game_image_limit = event.get("game_image_limit", 20)
        player_avatar_limit = event.get("player_avatar_limit", 20)
        trophy_icon_limit = event.get("trophy_icon_limit", 20)
        trophy_suite_image_limit = event.get("trophy_suite_image_limit", 20)
        igdb_image_limit = event.get("igdb_image_limit", 20)
        results = run_image_uploader(
            game_image_limit=game_image_limit,
            player_avatar_limit=player_avatar_limit,
            trophy_icon_limit=trophy_icon_limit,
            trophy_suite_image_limit=trophy_suite_image_limit,
            igdb_image_limit=igdb_image_limit,
        )
        logger.info(f"Successfully processed {len(results)} images.")
    except Exception as e:
        logger.error(f"Fatal error in image_uploader_handler: {e}", exc_info=True)
        raise


def igdb_handler(event, context):
    setup_logging_lambda()
    nb_game_to_match = int(event.get("limit", 20))

    return run_enricher(nb_game_to_match)
