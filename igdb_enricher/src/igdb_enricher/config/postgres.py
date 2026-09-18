import os
from dataclasses import dataclass

from sqlalchemy import Engine, create_engine


@dataclass
class TrophyQuestPostgresConfig:
    @property
    def url(self) -> str:
        user: str = os.environ['POSTGRES_USER']
        password: str = os.environ['POSTGRES_PASSWORD']
        host: str = os.environ['POSTGRES_HOST']
        port: str = os.environ['POSTGRES_PORT']
        database: str = os.environ['POSTGRES_DATABASE']
        return (
            f"postgresql+psycopg2://"
            f"{user}:{password}"
            f"@{host}:{port}/{database}"
        )

    @property
    def engine(self) -> Engine:
        return create_engine(self.url, pool_pre_ping=True)
