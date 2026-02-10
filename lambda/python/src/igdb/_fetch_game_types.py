import json
import os

import dotenv
import requests

from igdb import client

dotenv.load_dotenv()
token = client.get_igdb_token()
client_id = os.environ["TWITCH_CLIENT_ID"]
headers = {
    "Client-ID": client_id,
    "Authorization": f"Bearer {token}",
    "Accept": "application/json",
}
response = requests.post(
    url=f"{client.IGDB_BASE}/game_types",
    data="fields checksum,created_at,name,slug,updated_at;",
    headers=headers,
    timeout=15
)

if not response.ok:
    raise RuntimeError("IGDB error")

print(json.dumps(response.json(), indent=2))
