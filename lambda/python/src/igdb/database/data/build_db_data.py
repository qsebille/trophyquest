from ._build_igdb_collections import build_igdb_collections
from ._build_igdb_game_collections import build_igdb_game_collections
from ._build_igdb_game_companies import build_igdb_game_companies
from ._build_igdb_games import build_igdb_games
from ._build_igdb_images import build_igdb_images
from ._build_igddb_companies import build_igdb_companies


def build_db_data(igdb_games, candidates, match_statuses):
    return {
        'candidates': candidates,
        'match_statuses': match_statuses,
        'igdb_collections': build_igdb_collections(igdb_games),
        'igdb_companies': build_igdb_companies(igdb_games),
        'igdb_games': build_igdb_games(igdb_games),
        'igdb_game_companies': build_igdb_game_companies(igdb_games),
        'igdb_game_collections': build_igdb_game_collections(igdb_games),
        'igdb_images': build_igdb_images(igdb_games),
    }
