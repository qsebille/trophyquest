import logging
from dataclasses import dataclass, field

from sqlalchemy import text, Connection

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class IgdbCompanyRow:
    id: int
    name: str = field(compare=False)
    country_code: str = field(compare=False)

    @classmethod
    def build(cls, input_dict: dict) -> "IgdbCompanyRow":
        company = input_dict.get("company", {})
        company_id = company.get("id", None)
        company_name = company.get("name", None)
        company_country_code = company.get("country", None)
        return cls(
            id=company_id,
            name=company_name,
            country_code=company_country_code,
        )


def insert_companies(conn: Connection, rows: list[IgdbCompanyRow]):
    companies = [row for row in rows if row.id is not None]

    if not companies:
        logger.info("No company to insert")
        return

    result = conn.execute(
        text("""
             INSERT INTO igdb.company (id, name, country_code)
             VALUES (:id, :name, :country)
             ON CONFLICT (id) DO NOTHING
             """),
        [{"id": row.id, "name": row.name, "country": row.country_code} for row in companies],
    )
    logger.info(f"Inserted {result.rowcount} companies")
