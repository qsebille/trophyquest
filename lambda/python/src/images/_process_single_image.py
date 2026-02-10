import re
from io import BytesIO

import requests

import postgres
from images.database import queries as db_queries


def process_single_image(record, bucket_name, s3_client):
    image_id, psn_url, image_type, game_name, game_id = record
    print(f"Processing image {image_id} from {psn_url}")

    # Download image (with a sane timeout)
    response = requests.get(psn_url, timeout=20)
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

    # Update database (one connection per thread)
    pg_conn_thread = postgres.get_connection()
    try:
        db_queries.update_psn_game_image_aws_url(image_id, aws_url, pg_conn_thread)
    finally:
        pg_conn_thread.close()

    print(f"Successfully uploaded and updated image {image_id} to {aws_url}")
    return aws_url
