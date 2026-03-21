import logging

from igdb_enricher.run import run_enricher


def setup_logging_lambda():
    logger = logging.getLogger()
    if logger.handlers:
        for handler in logger.handlers:
            handler.setFormatter(logging.Formatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(name)s\t%(message)s\n",
                "%Y-%m-%dT%H:%M:%S"))
    logger.setLevel(logging.INFO)


def igdb_enricher_handler(event, context):
    setup_logging_lambda()

    logger = logging.getLogger(__name__)
    logger.info("IGDB Enricher: START")
    logger.info(f"Received event for IGDB Enricher: {event}")
    logger.info(f"Received context for IGDB Enricher: {context}")

    nb_game_to_match = int(event.get("limit", 20))
    logger.info(f"nb_game_to_match: {nb_game_to_match}")

    run_enricher(nb_game_to_match=nb_game_to_match)

    logger.info("IGDB Enricher: END")
