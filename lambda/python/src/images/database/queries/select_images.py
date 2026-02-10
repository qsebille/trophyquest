def select_psn_game_images(nb_image_to_select, connection):
    cursor = connection.cursor()
    query = f"""
            select pgi.id, pgi.psn_url
                from app.psn_game_image pgi
                where pgi.aws_url is null
            limit {nb_image_to_select};
            """

    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        raise
    finally:
        cursor.close()
