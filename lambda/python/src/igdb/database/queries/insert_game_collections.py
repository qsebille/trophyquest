def insert_game_collections(connection, game_collections):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_game_collection (game_id, collection_id)
            values (%s, %s)
            on conflict (game_id, collection_id) do nothing;
            """
    cursor.executemany(query, game_collections)
    return cursor.rowcount
