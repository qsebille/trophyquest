def insert_companies(connection, companies):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_company (id, name, country_code)
            values (%s, %s, %s)
            on conflict (id) do nothing;
            """
    cursor.executemany(query, companies)
    return cursor.rowcount
