from typing import Any


def build_app_game_companies(candidate_list: list[dict[str, Any]]):
    results = []

    for candidate in candidate_list:
        game_id = candidate.get("id")
        for developer in candidate.get("developers", []):
            results.append((game_id, developer.get("id"), "developer"))
        for publisher in candidate.get("publishers", []):
            results.append((game_id, publisher.get("id"), "publisher"))

    return results
