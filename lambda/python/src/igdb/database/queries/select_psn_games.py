import postgres


def select_psn_games_with_pending_match_status(nb_game_to_select=20):
    connection = postgres.get_connection()
    cursor = connection.cursor()
    query = f"""
            select g.id, g.name
            from app.psn_game g
            where g.igdb_match_status = 'PENDING'
            order by g.id
            limit {nb_game_to_select};
            """

    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
    finally:
        try:
            cursor.close()
        finally:
            connection.close()
