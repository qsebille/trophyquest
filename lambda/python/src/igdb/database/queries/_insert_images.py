def insert_images(images, connection):
    image_tuple_list = list((i['igdb_id'], i['url'], i['image_type']) for i in images)

    cursor = connection.cursor()
    query = """
            insert into app.igdb_image (igdb_game_id, igdb_url, image_type)
            values (%s, %s, %s) on conflict (igdb_game_id, igdb_url) do nothing;
            """

    try:
        cursor.executemany(query, image_tuple_list)
        return cursor.rowcount
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
