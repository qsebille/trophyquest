from requests import post

from igdb import client


def search_games_by_title(search_query, twitch_client_id):
    """
    Searches for games by title using the IGDB (Internet Game Database) API.

    This function takes a search query and a Twitch client ID, sends a request to the IGDB to search
    for games matching the query, and retrieves a list of games that match the specified criteria.
    The query filters games by accepted platforms and game types, includes metadata such as genres,
    themes, collections, videos, company data, and ensures the games have no parent version.

    :param search_query: The title or partial title of the game to search for.
    :type search_query: str
    :param twitch_client_id: The Client ID associated with the Twitch API for authentication and authorization.
    :type twitch_client_id: str
    :return: A list of games matching the search query, including rich meta-information.
    :rtype: list of dict
    """
    token = client.get_igdb_token()

    accepted_platforms = [
        client.PlatformCodes.ps3,
        client.PlatformCodes.ps4,
        client.PlatformCodes.ps5
    ]
    accepted_game_types = [
        client.GameTypeCodes.main_game,
        client.GameTypeCodes.bundle,
        client.GameTypeCodes.standalone_expansion,
        client.GameTypeCodes.remake,
        client.GameTypeCodes.remaster,
    ]

    query = f'''
        search "{search_query}";
        fields id, name, genres.name, themes.name, collections.name,
            videos.video_id,
            websites.url, websites.type.id,
            cover.image_id, screenshots.image_id,
            artworks.image_id, artworks.artwork_type.id,
            involved_companies.developer, involved_companies.publisher,
            involved_companies.company.name, involved_companies.company.country,
            game_type.type,
            first_release_date,
            summary;
        where version_parent = null & platforms = ({', '.join(accepted_platforms)}) & game_type = ({', '.join(accepted_game_types)});
        limit 10;
        '''

    headers = {
        "Client-ID": twitch_client_id,
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }
    response = post(f"{client.IGDB_BASE}/games", headers=headers, data=query, timeout=15)

    if not response.ok:
        raise RuntimeError(f"IGDB error {response.status_code}: {response.text}\nQuery:\n{query}")

    return response.json()
