def insert_companies(companies, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_company (id, name, country_code)
            values (%s, %s, %s) on conflict (id) do nothing;
            """

    print(f"Executing query: {query}")
    cursor.executemany(query, companies)
    return cursor.rowcount
