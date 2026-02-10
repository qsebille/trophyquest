def insert_game_companies(game_companies, connection):
    cursor = connection.cursor()
    query = """
            insert into app.igdb_game_company (game_id, company_id, role)
            values (%s, %s, %s) on conflict (game_id, company_id) do nothing;
            """

    try:
        cursor.executemany(query, game_companies)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
