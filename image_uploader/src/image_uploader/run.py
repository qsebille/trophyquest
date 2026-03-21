import logging
import os
from concurrent.futures import ThreadPoolExecutor

import boto3
import dotenv

from image_uploader.game.fetch import fetch_unuploaded_game_images
from image_uploader.game.upload import upload_game_image_to_s3
from image_uploader.igdb.fetch import fetch_unuploaded_igdb_images
from image_uploader.igdb.upload import upload_igdb_image_to_s3
from image_uploader.player.fetch import fetch_unuploaded_player_avatars
from image_uploader.player.upload import upload_player_avatar_to_s3
from image_uploader.postgres.connection import get_postgres_connection
from image_uploader.trophy.fetch import fetch_unuploaded_trophy_icons
from image_uploader.trophy.upload import upload_trophy_icon_to_s3
from image_uploader.trophy_suite.fetch import fetch_unuploaded_trophy_suite_images
from image_uploader.trophy_suite.upload import upload_trophy_suite_image_to_s3
from image_uploader.utils.process_image_batch import process_image_batch


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
    pg_conn = get_postgres_connection()
    game_images = fetch_unuploaded_game_images(limit=game_image_limit, connection=pg_conn)
    logger.info(f"Found {len(game_images)} game images to process.")

    player_avatars = fetch_unuploaded_player_avatars(limit=player_avatar_limit, connection=pg_conn)
    logger.info(f"Found {len(player_avatars)} player avatars to process.")

    trophy_icons = fetch_unuploaded_trophy_icons(limit=trophy_icon_limit, connection=pg_conn)
    logger.info(f"Found {len(trophy_icons)} trophy icons to process.")

    trophy_suite_images = fetch_unuploaded_trophy_suite_images(limit=trophy_suite_image_limit, connection=pg_conn)
    logger.info(f"Found {len(trophy_suite_images)} trophy suite images to process.")

    igdb_images = fetch_unuploaded_igdb_images(limit=igdb_image_limit, connection=pg_conn)
    logger.info(f"Found {len(igdb_images)} IGDB images to process.")
    pg_conn.close()

    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    s3_client = boto3.client("s3")

    total_results = []
    total_errors = []

    max_workers = int(os.environ.get("IMAGES_MAX_WORKERS", "16"))
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # 1. Game Images
        res, err = process_image_batch(
            executor=executor,
            images=game_images,
            upload_func=upload_game_image_to_s3,
            bucket_name=bucket_name,
            s3_client=s3_client,
            label="game"
        )
        total_results.extend(res)
        total_errors.extend(err)

        # 2. Player Avatars
        res, err = process_image_batch(
            executor=executor,
            images=player_avatars,
            upload_func=upload_player_avatar_to_s3,
            bucket_name=bucket_name,
            s3_client=s3_client,
            label="player_avatar"
        )
        total_results.extend(res)
        total_errors.extend(err)

        # 3. Trophy Icons
        res, err = process_image_batch(
            executor=executor,
            images=trophy_icons,
            upload_func=upload_trophy_icon_to_s3,
            bucket_name=bucket_name,
            s3_client=s3_client,
            label="trophy_icon"
        )
        total_results.extend(res)
        total_errors.extend(err)

        # 4. Trophy Suite Images
        res, err = process_image_batch(
            executor=executor,
            images=trophy_suite_images,
            upload_func=upload_trophy_suite_image_to_s3,
            bucket_name=bucket_name,
            s3_client=s3_client,
            label="trophy_suite"
        )
        total_results.extend(res)
        total_errors.extend(err)

        # 5. IGDB Images
        res, err = process_image_batch(
            executor=executor,
            images=igdb_images,
            upload_func=upload_igdb_image_to_s3,
            bucket_name=bucket_name,
            s3_client=s3_client,
            label="igdb"
        )
        total_results.extend(res)
        total_errors.extend(err)

    if len(total_errors) > 0:
        logger.error(f"Total errors processing {len(total_errors)} images")

    return total_results
