import os

import pg8000.dbapi as dbapi


def get_connection():
    host = os.environ["POSTGRES_HOST"]
    port = os.environ["POSTGRES_PORT"]
    database = os.environ["POSTGRES_DATABASE"]
    user = os.environ["POSTGRES_USER"]
    password = os.environ["POSTGRES_PASSWORD"]

    return dbapi.connect(user=user, password=password, host=host, port=port, database=database)
