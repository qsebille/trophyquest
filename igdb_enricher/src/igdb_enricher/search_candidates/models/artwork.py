from dataclasses import dataclass
from enum import Enum


class _ImageType(Enum):
    KEY_ART_WITHOUT_LOGO = 2
    KEY_ART_WITH_LOGO = 3
    UNCERTAIN = 0


@dataclass
class Artwork:
    image_id: str
    height: int
    width: int
    image_type_id: int

    # TODO: Revoir, accepter plus de résolutions (ex: Jusant)
    @property
    def resolution(self) -> int:
        if self.width == 0 or self.height == 0:
            return 0
        return self.width / self.height

    @property
    def image_type(self) -> _ImageType:
        match self.image_type_id:
            case _ImageType.KEY_ART_WITHOUT_LOGO.value:
                return _ImageType.KEY_ART_WITHOUT_LOGO
            case _ImageType.KEY_ART_WITH_LOGO.value:
                return _ImageType.KEY_ART_WITH_LOGO
            case _:
                return _ImageType.UNCERTAIN

    @property
    def is_potential_background(self) -> bool:
        resolution_ok = 16 / 9 - 0.01 < self.resolution < 16 / 9 + 0.01
        size_ok = min(self.height, self.width) > 1000
        return resolution_ok and size_ok

    @classmethod
    def from_dict(cls, artwork: dict) -> "Artwork":
        return cls(
            image_id=artwork.get("image_id"),
            height=artwork.get("height", 0),
            width=artwork.get("width", 1),
            image_type_id=artwork.get("image_type", {}).get("id")
        )


def compute_candidate_background(artworks: list[dict]) -> str | None:
    if not artworks:
        return None

    casted_artworks = [Artwork.from_dict(a) for a in artworks]
    background_without_logo = next((
        a for a in casted_artworks
        if a.is_potential_background and a.image_type == _ImageType.KEY_ART_WITHOUT_LOGO
    ), None)
    background_with_logo = next((
        a for a in casted_artworks
        if a.is_potential_background and a.image_type == _ImageType.KEY_ART_WITH_LOGO
    ), None)
    background_undefined = next((
        a for a in casted_artworks
        if a.is_potential_background and a.image_type == _ImageType.UNCERTAIN
    ), None)

    background = background_without_logo or background_with_logo or background_undefined
    background_id = background.image_id if background else None
    return f"https://images.igdb.com/igdb/image/upload/t_720p/{background_id}.jpg" if background_id else None
