from igdb_enricher.candidate.score import compute_match_score


def test_compute_match_score_exact_match():
    assert compute_match_score("The Last of Us", "The Last of Us") == 100


def test_compute_match_score_case_insensitive():
    assert compute_match_score("the last of us", "THE LAST OF US") == 100


def test_compute_match_score_partial_match():
    # intersection: "the", "last", "of", "us" (4 tokens)
    # query_tokens: "the", "last", "of", "us", "part", "i" (6 tokens)
    # candidate_tokens: "the", "last", "of", "us" (4 tokens)
    # precision = 4/6 = 0.666
    # recall = 4/4 = 1.0
    # f1 = 2 * (4/6 * 1) / (4/6 + 1) = 2 * 0.666 / 1.666 = 1.333 / 1.666 = 0.8
    assert compute_match_score("The Last of Us Part I", "The Last of Us") == 80


def test_compute_match_score_no_match():
    assert compute_match_score("God of War", "Uncharted") == 0


def test_compute_match_score_normalization():
    assert compute_match_score("Pokémon", "Pokemon") == 100
    assert compute_match_score("Spider-Man", "Spider Man") == 100
