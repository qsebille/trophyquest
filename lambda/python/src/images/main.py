import logging
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

import boto3
import dotenv

import postgres
from images.psn_game import process_game_image, select_game_image
from images.psn_player import select_player_image, process_player_avatar


def run_image_uploader(nb_psn_images=10, nb_psn_player=10, max_workers=None):
    logger = logging.getLogger(__name__)
    dotenv.load_dotenv()

    # Fetch the list of images to process using a single connection, then close it
    pg_conn = postgres.get_connection()
    game_images = select_game_image(nb_psn_images, pg_conn)
    player_avatars = select_player_image(nb_psn_player, pg_conn)

    logger.info(f"Found {len(game_images)} game images to process.")
    logger.info(f"Found {len(player_avatars)} player avatars to process.")
    pg_conn.close()

    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    s3_client = boto3.client("s3")

    # Allow override via env var; default to 16 workers
    if max_workers is None:
        max_workers = int(os.environ.get("IMAGES_MAX_WORKERS", "16"))

    results = []
    errors = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_rec = {
            executor.submit(process_game_image, rec, bucket_name, s3_client): rec for rec in game_images
        }
        for rec in player_avatars:
            future_to_rec[executor.submit(process_player_avatar, rec, bucket_name, s3_client)] = rec

        for future in as_completed(future_to_rec):
            rec = future_to_rec[future]
            image_id = rec[0]
            try:
                aws_url = future.result()
                results.append(aws_url)
            except Exception as e:
                logger.error(f"Error processing image {image_id}: {e}")
                errors.append(image_id)

    if len(errors) > 0:
        logger.error(f"Errors processing {len(errors)} images:")
        for image_id in errors:
            logger.error(f"  {image_id}")

    return results


if __name__ == "__main__":
    run_image_uploader()
