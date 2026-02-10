def insert_candidates(candidates, connection):
    candidates_tuple_list = list((c['psn_id'], c['igdb_id'], c['score'], c['status']) for c in candidates)

    cursor = connection.cursor()
    query = """
            insert into app.igdb_candidate (psn_game_id, igdb_game_id, score, status)
            values (%s, %s, %s, %s) on conflict (psn_game_id, igdb_game_id) do nothing;
            """

    try:
        cursor.executemany(query, candidates_tuple_list)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
