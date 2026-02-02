import postgres


def select_unmapped_games(nb_game_to_select=20):
    """Select unmapped PSN games from the database.

    Args:
        nb_game_to_select (int): Number of games to select. Defaults to 20.

    Returns:
        list: List of tuples containing game ID and name.
    """
    connection = postgres.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(
            f"""
            select g.id, g.name
            from app.psn_game g
                     left join app.igdb_candidate c on c.psn_game_id = g.id
            where c.igdb_game_id is null
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
