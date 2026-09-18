import logging
from dataclasses import dataclass, field

from sqlalchemy import text, Connection

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class IgdbScreenshotRow:
    id: int
    game_id: int = field(compare=False)
    igdb_url: str = field(compare=False)

    @classmethod
    def build(cls, game_id: int, screenshot_id: str) -> "IgdbScreenshotRow":
        url = f"https://images.igdb.com/igdb/image/upload/t_720p/{screenshot_id}.jpg"
        return cls(
            id=screenshot_id,
            game_id=game_id,
            igdb_url=url,
        )


def insert_screenshots(conn: Connection, rows: list[IgdbScreenshotRow]):
    screenshots = [row for row in rows if row.id is not None and row.igdb_url is not None and row.game_id is not None]

    if not screenshots:
        logger.info("No screenshot to insert")
        return

    result = conn.execute(
        text("""
             INSERT INTO igdb.screenshot (id, game_id, igdb_url)
             VALUES (:id, :game_id, :igdb_url)
             ON CONFLICT (id) DO NOTHING
             """),
        [{"id": row.id, "game_id": row.game_id, "igdb_url": row.igdb_url} for row in screenshots]
    )
    logger.info(f"Inserted {result.rowcount} collections")
