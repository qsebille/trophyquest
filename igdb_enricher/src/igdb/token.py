import os
import time

import requests

from igdb_enricher.src.igdb.constants import TWITCH_TOKEN_URL

_token = None
_token_exp = 0


def get_igdb_token():
    """Gets cached or new IGDB access token"""
    global _token, _token_exp
    now = int(time.time())

    if _token and now < _token_exp - 60:
        return _token

    client_id = os.environ["TWITCH_CLIENT_ID"]
    client_secret = os.environ["TWITCH_CLIENT_SECRET"]

    r = requests.post(
        TWITCH_TOKEN_URL,
        params={"client_id": client_id, "client_secret": client_secret, "grant_type": "client_credentials"},
        timeout=10,
    )
    r.raise_for_status()
    data = r.json()
    _token = data["access_token"]
    _token_exp = now + int(data["expires_in"])
    return _token
