from igdb.run_enricher import run_enricher


def lambda_handler(event, context):
    nb_game_to_match = int(event.get("limit", 20))

    return run_enricher(nb_game_to_match)
