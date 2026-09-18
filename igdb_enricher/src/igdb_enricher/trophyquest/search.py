import logging

import pandas as pd
from sqlalchemy import text, Engine

logger = logging.getLogger(__name__)


def search_unlinked_suites(engine: Engine, limit: int) -> pd.DataFrame:
    select_query = text(f"""
                 SELECT id, name, platforms
                 FROM psn.suite s
                    LEFT JOIN psn.played_suite ps ON ps.suite_id = s.id
                 WHERE NOT EXISTS (
                    SELECT 1
                    FROM app.igdb_matching m
                    WHERE m.suite_id = s.id
                )
                 ORDER BY ps.last_played_at DESC
                 LIMIT {limit};
                 """)

    with engine.connect() as conn:
        df = pd.read_sql(select_query, conn)
        logger.info(f"Fetched {len(df)} suites without game")

    return df
