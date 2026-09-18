import os
import time
from dataclasses import dataclass

import requests

TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token"
IGDB_BASE_URL = "https://api.igdb.com/v4"


@dataclass
class TwitchConfig:
    _token: str | None = None
    _token_expiration = 0

    @property
    def client_id(self) -> str:
        return os.environ["TWITCH_CLIENT_ID"]

    @property
    def token(self) -> str:
        now = int(time.time())

        if self._token is not None and now < self._token_expiration - 60:
            return self._token

        client_secret = os.environ["TWITCH_CLIENT_SECRET"]
        r = requests.post(
            TWITCH_TOKEN_URL,
            params={
                "client_id": self.client_id,
                "client_secret": client_secret,
                "grant_type": "client_credentials"
            },
            timeout=10,
        )
        r.raise_for_status()
        data = r.json()

        new_token = data["access_token"]
        self._token = new_token
        self._token_expiration = now + int(data["expires_in"])
        return new_token
