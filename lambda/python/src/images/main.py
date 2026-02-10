import os

import dotenv

import postgres
from images.database import queries as db_queries


def run_image_uploader(nb_psn_images=2):
    dotenv.load_dotenv()
    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    pg_conn = postgres.get_connection()

    psn_game_images = db_queries.select_psn_game_images(nb_psn_images, pg_conn)

    return "Hello World!"


if __name__ == "__main__":
    run_image_uploader()


def lambda_handler(event, context):
    return run_image_uploader()
