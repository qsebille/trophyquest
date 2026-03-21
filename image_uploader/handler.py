import logging

from image_uploader.src.run import run_image_uploader


def setup_logging_lambda():
    logger = logging.getLogger()
    if logger.handlers:
        for handler in logger.handlers:
            handler.setFormatter(logging.Formatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(name)s\t%(message)s\n",
                "%Y-%m-%dT%H:%M:%S"))
    logger.setLevel(logging.INFO)


def image_uploader_handler(event, context):
    setup_logging_lambda()
    logger = logging.getLogger(__name__)
    logger.info("Image Uploader: START")
    logger.info(f"Received event for image uploader: {event}")

    game_image_limit = event.get("game_image_limit", 20)
    player_avatar_limit = event.get("player_avatar_limit", 20)
    trophy_icon_limit = event.get("trophy_icon_limit", 20)
    trophy_suite_image_limit = event.get("trophy_suite_image_limit", 20)
    igdb_image_limit = event.get("igdb_image_limit", 20)

    logger.info(f"game_image_limit: {game_image_limit}")
    logger.info(f"player_avatar_limit: {player_avatar_limit}")
    logger.info(f"trophy_icon_limit: {trophy_icon_limit}")
    logger.info(f"trophy_suite_image_limit: {trophy_suite_image_limit}")
    logger.info(f"igdb_image_limit: {igdb_image_limit}")

    run_image_uploader(
        game_image_limit=game_image_limit,
        player_avatar_limit=player_avatar_limit,
        trophy_icon_limit=trophy_icon_limit,
        trophy_suite_image_limit=trophy_suite_image_limit,
        igdb_image_limit=igdb_image_limit,
    )

    logger.info("Image Uploader: END")
