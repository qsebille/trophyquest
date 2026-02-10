from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from igdb import client


def format_igdb_game(raw_game: dict[str, Any]):
    def get_image_url(image_id: str, size: str) -> str:
        return f"https://images.igdb.com/igdb/image/upload/{size}/{image_id}.jpg"

    # Format genres and themes
    genres = []
    for genre in raw_game.get("genres", []):
        genres.append(genre.get("name", ""))
    raw_game["genres"] = genres
    themes = []
    for theme in raw_game.get("themes", []):
        themes.append(theme.get("name", ""))
    raw_game["themes"] = themes

    # Format images (cover, artworks, screenshots)
    images = []
    cover_image_id = raw_game.get("cover", {}).get("image_id")
    if cover_image_id:
        images.append({"url": get_image_url(cover_image_id, "t_cover_big"), "type": "cover"})

    for artwork in raw_game.get("artworks", []):
        url = get_image_url(artwork.get("image_id"), "t_720p")
        artwork_type = artwork.get("artwork_type", {}).get("slug", "")
        image_type = f"artwork:{artwork_type}"
        images.append({"url": url, "type": image_type})

    for screenshot in raw_game.get("screenshots", []):
        url = get_image_url(screenshot.get("image_id"), "t_720p")
        images.append({"url": url, "type": "screenshot"})

    raw_game["images"] = images
    raw_game.pop("cover", None)
    raw_game.pop("artworks", None)
    raw_game.pop("screenshots", None)

    # Format websites
    for website in raw_game.get("websites", []):
        website_type = website.get("type", {}).get("id", "")
        match website_type:
            case client.WebsiteCategoryCodes.playstation:
                raw_game["psn_website"] = website.get("url", "")
            case client.WebsiteCategoryCodes.official:
                raw_game["official_website"] = website.get("url", "")
            case client.WebsiteCategoryCodes.community:
                raw_game["community_wiki_website"] = website.get("url", "")
    raw_game.pop("websites", None)

    # Format youtube video ids
    youtube_ids = []
    for video in raw_game.get("videos", []):
        if video.get("video_id", ""):
            youtube_ids.append(video.get("video_id"))
    raw_game["youtube_ids"] = youtube_ids
    raw_game.pop("videos", None)

    # Format involved companies
    developers = []
    publishers = []
    for involved_company in raw_game.get("involved_companies", []):
        company_name = involved_company.get("company", {}).get("name", "")
        company_id = involved_company.get("company", {}).get("id", "")
        company_country = involved_company.get("company", {}).get("country", "")
        company = {"id": company_id, "name": company_name, "country": company_country}
        if involved_company.get("developer", False): developers.append(company)
        if involved_company.get("publisher", False): publishers.append(company)
    raw_game["developers"] = developers
    raw_game["publishers"] = publishers
    raw_game.pop("involved_companies", None)

    # Format release date
    release_datetime = datetime.fromtimestamp(raw_game.get("first_release_date", 0), tz=ZoneInfo("Europe/Paris"))
    release_date = release_datetime.strftime("%Y-%m-%d")
    raw_game["release_date"] = release_date
    raw_game.pop("first_release_date", None)

    return raw_game.get("id"), raw_game
