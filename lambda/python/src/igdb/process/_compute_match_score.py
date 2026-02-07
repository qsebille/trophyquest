import math
import re

import unicodedata


def compute_match_score(game_name: str, candidate_name: str) -> int:
    """Computes F1‑based similarity score between game and candidate name"""

    def normalize(s: str) -> str:
        s = s.lower().strip()

        # Unicode normalization
        s = unicodedata.normalize("NFKD", s)
        s = "".join(ch for ch in s if not unicodedata.combining(ch))

        # Alphanumeric normalization
        s = re.compile(r"[^a-z0-9]+").sub(" ", s)

        # Trim + collapse whitespace
        s = re.compile(r"\s+").sub(" ", s).strip()
        return s

    query_tokens = normalize(game_name).split(" ")
    candidate_tokens = normalize(candidate_name).split(" ")

    if query_tokens == candidate_tokens:
        return 100

    intersection = len(set(query_tokens).intersection(set(candidate_tokens)))
    precision = intersection / len(query_tokens)
    recall = intersection / len(candidate_tokens)
    f1_score = 0 if intersection == 0 else (2 * precision * recall) / (precision + recall)

    return int(math.floor(f1_score * 100))
