import logging
from dataclasses import dataclass, field

from sqlalchemy import text, Connection

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class IgdbCollectionRow:
    id: int
    name: str = field(compare=False)

    @classmethod
    def build(cls, input_dict: dict) -> "IgdbCollectionRow":
        return cls(
            id=input_dict.get("id", None),
            name=input_dict.get("name", None),
        )


def insert_collections(conn: Connection, rows: list[IgdbCollectionRow]):
    collections = [row for row in rows if row.id is not None]

    if not collections:
        logger.info("No collection to insert")
        return

    result = conn.execute(
        text("""
             INSERT INTO igdb.collection (id, name)
             VALUES (:id, :name)
             ON CONFLICT (id) DO NOTHING
             """),
        [{"id": row.id, "name": row.name} for row in collections],
    )
    logger.info(f"Inserted {result.rowcount} collections")
