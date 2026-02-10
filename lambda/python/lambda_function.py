from igdb.main import run_enricher
from images.main import run_image_uploader


def image_uploader_handler(event, context):
    return run_image_uploader()


def igdb_handler(event, context):
    nb_game_to_match = int(event.get("limit", 20))

    return run_enricher(nb_game_to_match)
