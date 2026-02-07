from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from igdb import client


def format_igdb_game(raw_game: dict[str, Any]):
    def get_image_url(image_id: str, size: str = "t_cover_big") -> str:
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
    cover_image = raw_game.get("cover", {}).get("image_id")
    raw_game["cover"] = get_image_url(cover_image) if cover_image else None

    for artwork in raw_game.get("artworks", []):
        url = get_image_url(artwork.get("image_id"), "t_720p")
        if artwork.get("artwork_type", {}).get("id", "") == 3: raw_game["artwork_with_logo"] = url
        if artwork.get("artwork_type", {}).get("id", "") == 2: raw_game["artwork_without_logo"] = url
    raw_game.pop("artworks", None)

    screenshots = []
    for screenshot in raw_game.get("screenshots", []):
        url = get_image_url(screenshot.get("image_id"), "t_720p")
        screenshots.append(url)
    raw_game["screenshots"] = screenshots

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
