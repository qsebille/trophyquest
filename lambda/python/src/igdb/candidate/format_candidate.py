from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from igdb import client


def format_candidate(candidate: dict[str, Any], game_title: str):
    def get_image_url(image_id: str, size: str = "t_cover_big") -> str:
        return f"https://images.igdb.com/igdb/image/upload/{size}/{image_id}.jpg"

    # Format genres and themes
    genres = []
    for genre in candidate.get("genres", []):
        genres.append(genre.get("name", ""))
    candidate["genres"] = genres
    themes = []
    for theme in candidate.get("themes", []):
        themes.append(theme.get("name", ""))
    candidate["themes"] = themes

    # Format images (cover, artworks, screenshots)
    cover_image = candidate.get("cover", {}).get("image_id")
    candidate["cover"] = get_image_url(cover_image) if cover_image else None

    for artwork in candidate.get("artworks", []):
        url = get_image_url(artwork.get("image_id"), "t_720p")
        if artwork.get("artwork_type", {}).get("id", "") == 3: candidate["artwork_with_logo"] = url
        if artwork.get("artwork_type", {}).get("id", "") == 2: candidate["artwork_without_logo"] = url
    candidate.pop("artworks", None)

    screenshots = []
    for screenshot in candidate.get("screenshots", []):
        url = get_image_url(screenshot.get("image_id"), "t_720p")
        screenshots.append(url)
    candidate["screenshots"] = screenshots

    # Format websites
    for website in candidate.get("websites", []):
        website_type = website.get("type", {}).get("id", "")
        match website_type:
            case client.WebsiteCategoryCodes.playstation:
                candidate["psn_website"] = website.get("url", "")
            case client.WebsiteCategoryCodes.official:
                candidate["official_website"] = website.get("url", "")
            case client.WebsiteCategoryCodes.community:
                candidate["community_wiki_website"] = website.get("url", "")
    candidate.pop("websites", None)

    # Format youtube video ids
    youtube_ids = []
    for video in candidate.get("videos", []):
        if video.get("video_id", ""):
            youtube_ids.append(video.get("video_id"))
    candidate["youtube_ids"] = youtube_ids
    candidate.pop("videos", None)

    # Format involved companies
    developers = []
    publishers = []
    for involved_company in candidate.get("involved_companies", []):
        company_name = involved_company.get("company", {}).get("name", "")
        company_id = involved_company.get("company", {}).get("id", "")
        company_country = involved_company.get("company", {}).get("country", "")
        company = {"id": company_id, "name": company_name, "country": company_country}
        if involved_company.get("developer", False): developers.append(company)
        if involved_company.get("publisher", False): publishers.append(company)
    candidate["developers"] = developers
    candidate["publishers"] = publishers
    candidate.pop("involved_companies", None)

    # Format release date
    release_datetime = datetime.fromtimestamp(candidate.get("first_release_date", 0), tz=ZoneInfo("Europe/Paris"))
    release_date = release_datetime.strftime("%Y-%m-%d")
    candidate["release_date"] = release_date
    candidate.pop("first_release_date", None)

    return candidate
