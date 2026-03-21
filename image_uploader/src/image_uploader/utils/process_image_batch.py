import logging
from concurrent.futures import ThreadPoolExecutor, as_completed


def process_image_batch(
        executor: ThreadPoolExecutor,
        images: list,
        upload_func,
        bucket_name: str,
        s3_client,
        label: str,
):
    """Processes a batch of images using the provided upload function."""
    logger = logging.getLogger(__name__)

    if not images:
        return [], []

    results = []
    errors = []
    future_to_rec = {
        executor.submit(upload_func, rec, bucket_name, s3_client): rec for rec in images
    }

    for future in as_completed(future_to_rec):
        rec = future_to_rec[future]
        image_id = rec[0]
        try:
            aws_url = future.result()
            results.append((image_id, aws_url))
        except Exception as e:
            logger.error(f"Error processing {label} image {image_id}: {e}")
            errors.append(image_id)

    if errors:
        logger.error(f"Errors processing {len(errors)} {label} images")
        for image_id in errors:
            logger.error(f"Error processing {label} image: {image_id}")

    return results, errors
