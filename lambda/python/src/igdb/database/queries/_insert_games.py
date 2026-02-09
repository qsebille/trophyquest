def insert_games(games, connection):
    cursor = connection.cursor()
    fields = [
        'summary',
        'game_type',
        'release_date',
        'genres',
        'themes',
        'psn_website',
        'official_website',
        'community_wiki_website',
        'youtube_ids',
    ]
    placeholders = ', '.join(['%s'] * len(fields))
    query = f"""
            insert into app.igdb_game (id, name, {', '.join(fields)})
            values (%s, %s, {placeholders})
            on conflict (id) do nothing;
            """

    try:
        cursor.executemany(query, games)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
