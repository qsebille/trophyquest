def insert_game_companies(connection, game_companies):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_game_company (game_id, company_id, role)
            values (%s, %s, %s)
            on conflict (game_id, company_id) do nothing;
            """
    cursor.executemany(query, game_companies)
    return cursor.rowcount
