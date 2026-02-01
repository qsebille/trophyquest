def insert_candidates(connection, candidates):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_candidate (psn_game_id, igdb_game_id, score, status)
            values (%s, %s, %s, %s)
            on conflict (psn_game_id, igdb_game_id) do nothing;
            """
    cursor.executemany(query, candidates)
    return cursor.rowcount
