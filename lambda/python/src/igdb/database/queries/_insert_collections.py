def insert_collections(collections, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_collection (id, name)
            values (%s, %s) on conflict (id) do nothing;
            """

    try:
        cursor.executemany(query, collections)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
