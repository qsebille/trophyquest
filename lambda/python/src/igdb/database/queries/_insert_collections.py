def insert_collections(collections, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_collection (id, name)
            values (%s, %s) on conflict (id) do nothing;
            """

    print(f"Executing query: {query}")
    cursor.executemany(query, collections)
    return cursor.rowcount
