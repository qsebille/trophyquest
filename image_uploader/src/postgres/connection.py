import logging
import os

import pg8000
import pg8000.dbapi as dbapi


def get_postgres_connection() -> pg8000.Connection:
    logger = logging.getLogger(__name__)
    host = os.environ["POSTGRES_HOST"]
    port = os.environ["POSTGRES_PORT"]
    database = os.environ["POSTGRES_DATABASE"]
    user = os.environ["POSTGRES_USER"]
    password = os.environ["POSTGRES_PASSWORD"]

    try:
        conn = dbapi.connect(user=user, password=password, host=host, port=port, database=database)
        logger.info("Successfully connected to postgres")
        return conn
    except Exception as e:
        logger.error(f"Failed to connect to postgres: {e}")
        raise
