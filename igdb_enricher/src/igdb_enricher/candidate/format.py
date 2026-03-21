from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from igdb_enricher.igdb.constants import WebsiteCategoryCodes


def format_igdb_game(raw_candidate: dict[str, Any]):
    def get_image_url(image_id: str, size: str) -> str:
        return f"https://images.igdb.com/igdb/image/upload/{size}/{image_id}.jpg"

    # Format genres and themes
    genres = []
    for genre in raw_candidate.get("genres", []):
        genres.append(genre.get("name", ""))
    raw_candidate["genres"] = genres
    themes = []
    for theme in raw_candidate.get("themes", []):
        themes.append(theme.get("name", ""))
    raw_candidate["themes"] = themes

    # Format images (cover, artworks, screenshots)
    images = []
    cover_image_id = raw_candidate.get("cover", {}).get("image_id")
    if cover_image_id:
        images.append({"url": get_image_url(cover_image_id, "t_cover_big"), "type": "cover"})

    for artwork in raw_candidate.get("artworks", []):
        url = get_image_url(artwork.get("image_id"), "t_720p")
        artwork_type = artwork.get("artwork_type", {}).get("slug", "")
        image_type = f"artwork:{artwork_type}"
        images.append({"url": url, "type": image_type})

    for screenshot in raw_candidate.get("screenshots", []):
        url = get_image_url(screenshot.get("image_id"), "t_720p")
        images.append({"url": url, "type": "screenshot"})

    raw_candidate["images"] = images
    raw_candidate.pop("cover", None)
    raw_candidate.pop("artworks", None)
    raw_candidate.pop("screenshots", None)

    # Format websites
    for website in raw_candidate.get("websites", []):
        website_type = website.get("type", {}).get("id", "")
        match website_type:
            case WebsiteCategoryCodes.playstation:
                raw_candidate["psn_website"] = website.get("url", "")
            case WebsiteCategoryCodes.official:
                raw_candidate["official_website"] = website.get("url", "")
            case WebsiteCategoryCodes.community:
                raw_candidate["community_wiki_website"] = website.get("url", "")
    raw_candidate.pop("websites", None)

    # Format youtube video ids
    youtube_ids = []
    for video in raw_candidate.get("videos", []):
        if video.get("video_id", ""):
            youtube_ids.append(video.get("video_id"))
    raw_candidate["youtube_ids"] = youtube_ids
    raw_candidate.pop("videos", None)

    # Format involved companies
    developers = []
    publishers = []
    for involved_company in raw_candidate.get("involved_companies", []):
        company_name = involved_company.get("company", {}).get("name", "")
        company_id = involved_company.get("company", {}).get("id", "")
        company_country = involved_company.get("company", {}).get("country", "")
        company = {"id": company_id, "name": company_name, "country": company_country}
        if involved_company.get("developer", False): developers.append(company)
        if involved_company.get("publisher", False): publishers.append(company)
    raw_candidate["developers"] = developers
    raw_candidate["publishers"] = publishers
    raw_candidate.pop("involved_companies", None)

    # Format release date
    release_datetime = datetime.fromtimestamp(raw_candidate.get("first_release_date", 0), tz=ZoneInfo("Europe/Paris"))
    release_date = release_datetime.strftime("%Y-%m-%d")
    raw_candidate["release_date"] = release_date
    raw_candidate.pop("first_release_date", None)

    return raw_candidate
