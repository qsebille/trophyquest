import os
import re
from io import BytesIO

import boto3
import dotenv
import requests

import postgres
from images.database import queries as db_queries


def run_image_uploader(nb_psn_images=2):
    dotenv.load_dotenv()
    pg_conn = postgres.get_connection()

    psn_game_images = db_queries.select_psn_game_images(nb_psn_images, pg_conn)

    # S3 Bucket where images will be uploaded
    bucket_name = os.environ["IMAGES_BUCKET_NAME"]
    s3_client = boto3.client("s3")
    results = []

    for image_id, psn_url, image_type, game_name, game_id in psn_game_images:
        print(f"Processing image {image_id} from {psn_url}")
        try:
            # Download image
            response = requests.get(psn_url)
            response.raise_for_status()
            image_content = response.content

            # Define S3 key (filename)
            file_extension = psn_url.split('.')[-1].split('?')[0]
            game_name_slug = re.sub(r'[^a-z0-9]+', '-', game_name.lower()).strip('-')
            s3_key = f"psn-game-image/{game_name_slug}_{game_id}/{image_type}/{image_id}.{file_extension}"

            # Upload to S3
            s3_client.upload_fileobj(
                BytesIO(image_content),
                bucket_name,
                s3_key,
                ExtraArgs={'ContentType': response.headers.get('Content-Type', 'image/png')}
            )

            aws_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

            # Update database
            db_queries.update_psn_game_image_aws_url(image_id, aws_url, pg_conn)
            print(f"Successfully uploaded and updated image {image_id} to {aws_url}")
            results.append(aws_url)

        except Exception as e:
            print(f"Error processing image {image_id}: {e}")

    return results


if __name__ == "__main__":
    run_image_uploader()


def lambda_handler(event, context):
    return run_image_uploader()
