import os
from datetime import datetime

import dotenv

from igdb import client

search_query = "Hitman"

dotenv.load_dotenv()
twitch_client_id = os.environ["TWITCH_CLIENT_ID"]
search_result = client.search_games_by_title(search_query, twitch_client_id)

if len(search_result) == 0:
    print(f"No games found for the given search query '{search_query}'.")

for candidate in search_result:
    c_id = candidate['id']
    name = candidate['name']
    c_type = candidate['game_type']['type']
    release_date_int = candidate['first_release_date']

    release_date = datetime.fromtimestamp(release_date_int).strftime('%Y-%m-%d') if release_date_int > 0 else None
    print(
        f"Game ID: {c_id}, Name: {name}, Type: {c_type}, Release Date: {release_date}")
