def update_psn_game_image_aws_url(image_id, aws_url, connection):
    cursor = connection.cursor()
    query = """
            UPDATE app.psn_game_image
            SET aws_url = %s
            WHERE id = %s;
            """

    try:
        cursor.execute(query, (aws_url, image_id))
        connection.commit()
    except Exception as e:
        print(f"Error executing query: {query}")
        print(f"Error details: {e}")
        connection.rollback()
        raise
    finally:
        cursor.close()
