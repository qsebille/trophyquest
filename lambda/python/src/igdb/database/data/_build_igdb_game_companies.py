from typing import Any


def build_igdb_game_companies(candidate_list: list[dict[str, Any]]):
    game_companies = []

    for candidate in candidate_list:
        game_id = candidate.get("id")
        for developer in candidate.get("developers", []):
            game_companies.append((game_id, developer.get("id"), "developer"))
        for publisher in candidate.get("publishers", []):
            game_companies.append((game_id, publisher.get("id"), "publisher"))

    return game_companies
