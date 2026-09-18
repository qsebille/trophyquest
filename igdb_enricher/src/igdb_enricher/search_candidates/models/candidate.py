from dataclasses import dataclass
from datetime import datetime

from igdb_enricher.search_candidates.models.artwork import compute_candidate_background


@dataclass
class IgdbCandidate:
    id: int
    name: str
    summary: str | None
    release_date: datetime | None
    game_type: str
    genres: list[str]
    themes: list[str]
    platforms: list[str]
    collections: list[dict]
    youtube_ids: list[str]
    cover_url: str
    background_url: str
    screenshot_ids: list[str]
    developer: dict
    publisher: dict
    official_website: str | None
    wikia_website: str | None
    version_parent: int | None

    @property
    def companies(self) -> list[dict]:
        return [self.developer, self.publisher]

    @property
    def developer_id(self) -> int | None:
        return self.developer.get("company", {}).get("id")

    @property
    def publisher_id(self) -> int | None:
        return self.publisher.get("company", {}).get("id")

    @staticmethod
    def _compute_cover_url(input_dict: dict) -> str | None:
        cover_id = input_dict.get("cover", {}).get("image_id", None)
        if cover_id is None:
            return None
        return f"https://images.igdb.com/igdb/image/upload/t_cover_big/{cover_id}.jpg"

    @staticmethod
    def _compute_developer(input_dict: dict) -> dict:
        involved_companies = input_dict.get("involved_companies", [])
        return next((
            c for c in involved_companies
            if c.get("developer", False) is True
        ), {})

    @staticmethod
    def _compute_publisher(input_dict: dict) -> dict:
        involved_companies = input_dict.get("involved_companies", [])
        return next((
            c for c in involved_companies
            if c.get("publisher", False) is True
        ), {})

    @staticmethod
    def _compute_screenshot_ids(input_dict: dict) -> dict:
        return [s.get("image_id")
                for s in input_dict.get("screenshots", [])
                if s.get("image_id") is not None]

    @staticmethod
    def _compute_official_website(input_dict: dict) -> str | None:
        return next((
            w.get("url")
            for w in input_dict.get("websites", [])
            if w.get("type", {}).get("id") == 1
        ), None)

    @staticmethod
    def _compute_wikia_website(input_dict: dict) -> str | None:
        return next((
            w.get("url")
            for w in input_dict.get("websites", [])
            if w.get("type", {}).get("id") == 2
        ), None)

    @classmethod
    def from_dict(cls, input_dict: dict) -> "IgdbCandidate":
        first_release_date = input_dict.get("first_release_date", None)
        release_date = datetime.fromtimestamp(first_release_date) if first_release_date else None
        return cls(
            id=input_dict["id"],
            name=input_dict["name"],
            summary=input_dict.get("summary"),
            release_date=release_date,
            game_type=input_dict["game_type"]["type"],
            genres=[g["name"] for g in input_dict.get("genres", [])],
            themes=[t["name"] for t in input_dict.get("themes", [])],
            platforms=[p["name"] for p in input_dict.get("platforms", [])],
            collections=input_dict.get("collections", []),
            youtube_ids=[v["video_id"] for v in input_dict.get("videos", [])],
            screenshot_ids=IgdbCandidate._compute_screenshot_ids(input_dict),
            cover_url=IgdbCandidate._compute_cover_url(input_dict),
            background_url=compute_candidate_background(input_dict.get("artworks", [])),
            developer=IgdbCandidate._compute_developer(input_dict),
            publisher=IgdbCandidate._compute_publisher(input_dict),
            official_website=IgdbCandidate._compute_official_website(input_dict),
            wikia_website=IgdbCandidate._compute_wikia_website(input_dict),
            version_parent=input_dict.get("version_parent"),
        )
