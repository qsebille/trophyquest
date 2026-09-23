def get_clean_title(title: str) -> str:
    # Remove all non-alphanumeric characters
    characters = [
        character for character in title
        if character.isalnum()
           or character.isspace()
           or character in ["'", "-"]
    ]

    title_alphanum = "".join(characters)
    return title_alphanum.lower()


def get_minimal_title(title: str) -> str:
    stop_words = ["the", "a", "and", "of", "to"]
    confusing_words = [
        "trophies", "trophy",
        "ultimate", "definitive", "collection", "edition"
    ]

    # Remove all unneeded words
    forbidden_words = stop_words + confusing_words
    minimal_title_words = [word for word in title.lower().split() if word not in forbidden_words]
    return " ".join(minimal_title_words)
