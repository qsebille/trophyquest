from typing import Any


def build_app_games(candidate_list: list[dict[str, Any]]):
    games = []

    for candidate in candidate_list:
        game_id = candidate.get("id")
        name = candidate.get("name")
        summary = candidate.get("summary")
        game_type = candidate.get("game_type", {'type': 'Unknown'}).get('type', 'Unknown')
        release_date = candidate.get("release_date")
        genres = candidate.get("genres", [])
        themes = candidate.get("themes", [])
        screenshots = candidate.get("screenshots", [])
        cover = candidate.get("cover")
        artwork_with_logo = candidate.get("artwork_with_logo")
        artwork_without_logo = candidate.get("artwork_without_logo")
        psn_website = candidate.get("psn_website")
        official_website = candidate.get("official_website")
        community_wiki_website = candidate.get("community_wiki_website")
        youtube_ids = candidate.get("youtube_ids", [])

        games.append(
            (
                game_id,
                name,
                summary,
                game_type,
                release_date,
                genres,
                themes,
                screenshots,
                cover,
                artwork_with_logo,
                artwork_without_logo,
                psn_website,
                official_website,
                community_wiki_website,
                youtube_ids
            )
        )

    return games
