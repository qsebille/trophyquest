def insert_companies(companies, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_company (id, name, country_code)
            values (%s, %s, %s) on conflict (id) do nothing;
            """

    try:
        cursor.executemany(query, companies)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
