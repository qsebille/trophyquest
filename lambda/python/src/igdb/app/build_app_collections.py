from typing import Any


def build_app_collections(candidate_list: list[dict[str, Any]]):
    collections = set()

    for candidate in candidate_list:
        for collection in candidate.get("collections", []):
            collection_id = collection.get("id")
            collection_name = collection.get("name")
            if collection_id is None or collection_name is None:
                continue
            collections.add((collection_id, collection_name))

    return list(collections)
