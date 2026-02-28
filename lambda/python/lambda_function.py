from igdb.main import run_enricher
from images.main import run_image_uploader


def image_uploader_handler(event, context):
    nb_psn_images = int(event.get("nb_psn_images", 100))
    return run_image_uploader(game_image_limit=nb_psn_images, player_limit=nb_psn_images)


def igdb_handler(event, context):
    nb_game_to_match = int(event.get("limit", 20))

    return run_enricher(nb_game_to_match)
