def insert_games(connection, games):
    cursor = connection.cursor()
    fields = [
        'summary',
        'game_type',
        'release_date',
        'genres',
        'themes',
        'screenshots',
        'cover',
        'artwork_with_logo',
        'artwork_without_logo',
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
    cursor.executemany(query, games)
    return cursor.rowcount
