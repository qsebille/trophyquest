from enum import Enum

from requests import post

from igdb_enricher.config.twitch import TwitchConfig, IGDB_BASE_URL


class _PlatformCodes(Enum):
    PS3 = 9
    PS4 = 48
    PS5 = 167


def _build_accepted_platforms(platforms: list[str] | None) -> list[int]:
    """ Returns the list of accepted IGDB platforms code based on the provided platform strings """
    all_platforms = [
        _PlatformCodes.PS3.value,
        _PlatformCodes.PS4.value,
        _PlatformCodes.PS5.value
    ]

    if not platforms:
        return all_platforms

    lower_platforms = [platform.lower() for platform in platforms]
    accepted_platforms = []
    if "ps5" in lower_platforms:
        accepted_platforms.append(_PlatformCodes.PS5.value)
    if "ps4" in lower_platforms:
        accepted_platforms.append(_PlatformCodes.PS4.value)
    if "ps3" in lower_platforms:
        accepted_platforms.append(_PlatformCodes.PS3.value)

    return accepted_platforms if accepted_platforms else all_platforms


def search_igdb_games(
        title: str,
        platforms: list[str] | None,
) -> list[dict]:
    """
    Performs a game search request in IGDB API for a given title and platforms (optional).
    If no platforms are provided, all PlayStation platforms are queried.
    """
    twitch_config = TwitchConfig()

    accepted_platforms = _build_accepted_platforms(platforms=platforms)
    platform_query = f"platforms = ({', '.join([str(p) for p in accepted_platforms])})"

    query = f'''
        search "{title}";
        fields id, name, 
            genres.name, themes.name, collections.name,
            videos.video_id,
            websites.url, websites.type.id,
            cover.image_id, screenshots.image_id,
            artworks.image_id, artworks.height, artworks.width, artworks.image_type.name,
            involved_companies.developer, involved_companies.publisher,
            involved_companies.company.name, involved_companies.company.country,
            game_type.type, version_parent, platforms.name,
            first_release_date,
            summary;
        where {platform_query};
        limit 10;
        '''

    headers = {
        "Client-ID": twitch_config.client_id,
        "Authorization": f"Bearer {twitch_config.token}",
        "Accept": "application/json",
    }
    response = post(f"{IGDB_BASE_URL}/games", headers=headers, data=query, timeout=15)

    if not response.ok:
        raise RuntimeError(f"IGDB error {response.status_code}: {response.text}\nQuery:\n{query}")

    return response.json()
