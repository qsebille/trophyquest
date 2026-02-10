import os
from concurrent.futures import ThreadPoolExecutor, as_completed

import boto3
import dotenv

import postgres
from images.database import queries as db_queries
from ._process_single_image import process_single_image


def run_image_uploader(nb_psn_images=10, max_workers=None):
    dotenv.load_dotenv()

    # Fetch the list of images to process using a single connection, then close it
    pg_conn = postgres.get_connection()
    psn_game_images = db_queries.select_psn_game_images(nb_psn_images, pg_conn)
    pg_conn.close()

    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    s3_client = boto3.client("s3")

    # Choose a reasonable default for IO-bound work if not provided
    if max_workers is None:
        # Allow override via env var; default to 16 workers
        max_workers = int(os.environ.get("IMAGES_MAX_WORKERS", "16"))

    results = []
    errors = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_rec = {executor.submit(process_single_image, rec, bucket_name, s3_client): rec for rec in
                         psn_game_images}
        for future in as_completed(future_to_rec):
            rec = future_to_rec[future]
            image_id = rec[0]
            try:
                aws_url = future.result()
                results.append(aws_url)
            except Exception as e:
                print(f"Error processing image {image_id}: {e}")
                errors.append(image_id)

    if len(errors) > 0:
        print(f"Errors processing {len(errors)} images:")
        for image_id in errors:
            print(f"  {image_id}")

    return results


if __name__ == "__main__":
    run_image_uploader()
