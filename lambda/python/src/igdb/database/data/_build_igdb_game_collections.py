from typing import Any


def build_igdb_game_collections(candidate_list: list[dict[str, Any]]):
    game_collections = []

    for candidate in candidate_list:
        game_id = candidate.get("id")
        for collection in candidate.get("collections", []):
            game_collections.append((game_id, collection.get("id")))

    return game_collections
