def insert_game_collections(game_collections, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_game_collection (game_id, collection_id)
            values (%s, %s) on conflict (game_id, collection_id) do nothing;
            """

    print(f"Executing query: {query}")
    cursor.executemany(query, game_collections)
    return cursor.rowcount
