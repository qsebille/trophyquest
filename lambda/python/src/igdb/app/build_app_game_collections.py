from typing import Any


def build_app_game_collections(candidate_list: list[dict[str, Any]]):
    results = []

    for candidate in candidate_list:
        game_id = candidate.get("id")
        for collection in candidate.get("collections", []):
            results.append((game_id, collection.get("id")))

    return results
