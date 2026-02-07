import postgres


def select_psn_games_with_pending_match_status(nb_game_to_select=20):
    connection = postgres.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(
            f"""
            select g.id, g.name
            from app.psn_game g
            where g.igdb_match_status = 'PENDING'
            order by g.id
            limit {nb_game_to_select};
            """
        )
        return cursor.fetchall()
    finally:
        try:
            cursor.close()
        finally:
            connection.close()
