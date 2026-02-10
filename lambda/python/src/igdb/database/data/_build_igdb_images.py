from typing import Any


def build_igdb_images(igdb_game_list: list[dict[str, Any]]):
    images = []

    for igdb_game in igdb_game_list:
        for image in igdb_game.get("images", []):
            images.append({'igdb_id': igdb_game.get("id"), 'url': image.get("url"), 'image_type': image.get("type")})

    return images
