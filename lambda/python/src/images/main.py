import logging
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

import boto3
import dotenv

import postgres
from images.igdb_image import get_unuploaded_igdb_images, upload_igdb_image_to_s3
from images.psn_game import get_unuploaded_game_images, upload_game_image_to_s3
from images.psn_player import get_unuploaded_player_avatars, upload_player_avatar_to_s3
from images.psn_trophy import get_unuploaded_trophy_icons, upload_trophy_icon_to_s3
from images.psn_trophy_suite import get_unuploaded_trophy_suite_images, upload_trophy_suite_image_to_s3


def run_image_uploader(
        game_image_limit: int,
        player_avatar_limit: int,
        trophy_icon_limit: int,
        trophy_suite_image_limit: int,
        igdb_image_limit: int,
):
    logger = logging.getLogger(__name__)
    dotenv.load_dotenv()

    # Fetch the list of images to process using a single connection, then close it
    pg_conn = postgres.get_connection()
    game_images = get_unuploaded_game_images(limit=game_image_limit, connection=pg_conn)
    logger.info(f"Found {len(game_images)} game images to process.")

    player_avatars = get_unuploaded_player_avatars(limit=player_avatar_limit, connection=pg_conn)
    logger.info(f"Found {len(player_avatars)} player avatars to process.")

    trophy_icons = get_unuploaded_trophy_icons(limit=trophy_icon_limit, connection=pg_conn)
    logger.info(f"Found {len(trophy_icons)} trophy icons to process.")

    trophy_suite_images = get_unuploaded_trophy_suite_images(limit=trophy_suite_image_limit, connection=pg_conn)
    logger.info(f"Found {len(trophy_suite_images)} trophy suite images to process.")

    igdb_images = get_unuploaded_igdb_images(limit=igdb_image_limit, connection=pg_conn)
    logger.info(f"Found {len(igdb_images)} IGDB images to process.")
    pg_conn.close()

    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    s3_client = boto3.client("s3")

    results = []
    errors = []

    max_workers = int(os.environ.get("IMAGES_MAX_WORKERS", "16"))
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_rec = {
            executor.submit(upload_game_image_to_s3, rec, bucket_name, s3_client): rec for rec in game_images
        }
        for rec in player_avatars:
            future_to_rec[executor.submit(upload_player_avatar_to_s3, rec, bucket_name, s3_client)] = rec
        for rec in trophy_icons:
            future_to_rec[executor.submit(upload_trophy_icon_to_s3, rec, bucket_name, s3_client)] = rec
        for rec in trophy_suite_images:
            future_to_rec[executor.submit(upload_trophy_suite_image_to_s3, rec, bucket_name, s3_client)] = rec
        for rec in igdb_images:
            future_to_rec[executor.submit(upload_igdb_image_to_s3, rec, bucket_name, s3_client)] = rec

        for future in as_completed(future_to_rec):
            rec = future_to_rec[future]
            image_id = rec[0]
            try:
                aws_url = future.result()
                results.append((image_id, aws_url))
            except Exception as e:
                logger.error(f"Error processing image {image_id}: {e}")
                errors.append(image_id)

    if len(errors) > 0:
        logger.error(f"Errors processing {len(errors)} images:")
        for image_id in errors:
            logger.error(f"  {image_id}")

    return results
