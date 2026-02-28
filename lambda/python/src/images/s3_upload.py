import io
import logging

import requests


def upload_image_to_aws(image_url: str, s3_path: str, s3_client, bucket_name: str) -> str | None:
    """
    Downloads an image from a given url and uploads it to s3.
    :return: The AWS URL of the uploaded image.
    """
    logger = logging.getLogger(__name__)

    # Download image (with a sane timeout)
    logger.info(f"Downloading image from {image_url}")
    response = requests.get(image_url, timeout=20)
    response.raise_for_status()

    # Upload image to s3
    file_extension = image_url.split('.')[-1].split('?')[0]
    s3_key = f"{s3_path}.{file_extension}"
    s3_client.upload_fileobj(io.BytesIO(response.content), bucket_name, s3_key)
    aws_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

    return aws_url
