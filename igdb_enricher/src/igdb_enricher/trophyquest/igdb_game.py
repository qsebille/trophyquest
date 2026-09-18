import logging
from dataclasses import dataclass

from sqlalchemy import Connection, text

from igdb_enricher.search_candidates.models.candidate import IgdbCandidate

logger = logging.getLogger(__name__)


@dataclass
class IgdbGameRow:
    id: int
    name: str
    summary: str | None
    game_type: str | None
    release_date: str | None
    genres: list[str]
    themes: list[str]
    platforms: list[str]
    cover_url: str | None
    background_url: str | None
    youtube_ids: list[str]
    publisher_id: int | None
    developer_id: int | None
    collection_id: int | None
    official_website: str | None
    wikia_website: str | None

    @classmethod
    def build(cls, candidate: IgdbCandidate):
        # A game can have multiple collections (theoretically), but we only select the first one
        collection_id = candidate.collections[0].get("id") if candidate.collections else None
        release_date = candidate.release_date.strftime("%Y-%m-%d") if candidate.release_date else None
        return cls(
            id=candidate.id,
            name=candidate.name,
            summary=candidate.summary,
            game_type=candidate.game_type,
            release_date=release_date,
            genres=candidate.genres,
            themes=candidate.themes,
            platforms=candidate.platforms,
            cover_url=candidate.cover_url,
            background_url=candidate.background_url,
            youtube_ids=candidate.youtube_ids,
            publisher_id=candidate.publisher_id,
            developer_id=candidate.developer_id,
            collection_id=collection_id,
            official_website=candidate.official_website,
            wikia_website=candidate.wikia_website,
        )


def insert_games(conn: Connection, games: list[IgdbGameRow]):
    if not games:
        logger.info("No game to insert")
        return

    result = conn.execute(
        text("""
             INSERT INTO igdb.game (id, name, summary, game_type, release_date, genres, themes, platforms,
                                    igdb_cover_url, igdb_background_url, youtube_ids, publisher_id, developer_id,
                                    collection_id, official_website, wikia_website)
             VALUES (:id, :name, :summary, :game_type, :release_date, :genres, :themes, :platforms, :cover_url,
                     :background_url, :youtube_ids, :publisher_id, :developer_id, :collection_id, :official_website,
                     :wikia_website)
             ON CONFLICT (id) DO NOTHING
             """),
        [
            {"id": game.id, "name": game.name, "summary": game.summary, "game_type": game.game_type,
             "release_date": game.release_date, "genres": game.genres, "themes": game.themes,
             "platforms": game.platforms, "cover_url": game.cover_url, "background_url": game.background_url,
             "youtube_ids": game.youtube_ids, "publisher_id": game.publisher_id, "developer_id": game.developer_id,
             "collection_id": game.collection_id, "official_website": game.official_website,
             "wikia_website": game.wikia_website}
            for game in games
        ],
    )
    logger.info(f"Inserted {result.rowcount} games")
