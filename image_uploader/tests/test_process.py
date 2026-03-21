from concurrent.futures import ThreadPoolExecutor

from image_uploader.utils.process_image_batch import process_image_batch


def test_process_image_batch_empty():
    executor = ThreadPoolExecutor(max_workers=1)
    results, errors = process_image_batch(executor, [], None, "bucket", None, "test")
    assert results == []
    assert errors == []


def test_process_image_batch_success():
    def mock_upload(rec, bucket, s3):
        return f"https://{bucket}/{rec[1]}"

    executor = ThreadPoolExecutor(max_workers=1)
    images = [(1, "img1.jpg"), (2, "img2.jpg")]
    results, errors = process_image_batch(executor, images, mock_upload, "my-bucket", None, "test")

    assert len(results) == 2
    assert (1, "https://my-bucket/img1.jpg") in results
    assert (2, "https://my-bucket/img2.jpg") in results
    assert errors == []


def test_process_image_batch_error():
    def mock_upload(rec, bucket, s3):
        if rec[0] == 2:
            raise Exception("Upload failed")
        return f"https://{bucket}/{rec[1]}"

    executor = ThreadPoolExecutor(max_workers=1)
    images = [(1, "img1.jpg"), (2, "img2.jpg")]
    results, errors = process_image_batch(executor, images, mock_upload, "my-bucket", None, "test")

    assert len(results) == 1
    assert (1, "https://my-bucket/img1.jpg") in results
    assert errors == [2]
