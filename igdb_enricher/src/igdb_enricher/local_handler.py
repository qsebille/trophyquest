import json
import logging

import dotenv
import requests

from igdb_enricher.config.twitch import TwitchConfig
from igdb_enricher.run import run_igdb_enricher


def run_enricher(limit: int):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    run_igdb_enricher(suite_limit=limit)


def run_igdb_query():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    dotenv.load_dotenv()
    twitch_config = TwitchConfig()

    headers = {
        "Client-ID": twitch_config.client_id,
        "Authorization": f"Bearer {twitch_config.token}",
        "Accept": "application/json",
    }
    query = """
    fields id, name, first_release_date;
    where id = '136191';
    """
    response = requests.post('https://api.igdb.com/v4/games', headers=headers, data=query, timeout=15)

    if not response.ok:
        raise RuntimeError(f"IGDB error {response.status_code}: {response.text}")

    result = response.json()
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    run_enricher(1)
    # run_igdb_query()
