def update_psn_games_match_data(match_statuses, connection):
    placeholders = []
    for s in match_statuses:
        igdb_id = s.get('igdb_id') if s.get('igdb_id') is not None else 'NULL'
        placeholders.append(f"('{s['psn_id']}'::uuid, '{s['status']}', {igdb_id})")

    cursor = connection.cursor()
    query = f"""
            update app.psn_game g
            set igdb_match_status = v.status, igdb_game_id = v.igdb_id
            from (values {', '.join(placeholders)}) as v(id, status, igdb_id)
            where g.id = v.id;
            """

    cursor.execute(query)
    return cursor.rowcount