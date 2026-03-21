from dataclasses import dataclass


@dataclass(frozen=True)
class InsertQueryType:
    name: str


class InsertQueryTypes:
    INSERT_GAMES = InsertQueryType(name="insert_games")
    INSERT_CANDIDATES = InsertQueryType(name='insert_candidates')
    INSERT_COLLECTIONS = InsertQueryType(name='insert_collections')
    INSERT_GAME_COLLECTIONS = InsertQueryType(name='insert_game_collections')
    INSERT_COMPANIES = InsertQueryType(name='insert_companies')
    INSERT_GAME_COMPANIES = InsertQueryType(name='insert_game_companies')
    INSERT_IMAGES = InsertQueryType(name='insert_images')


def get_insert_query(query_type: InsertQueryType) -> str:
    match query_type:
        case InsertQueryTypes.INSERT_GAMES:
            fields = [
                'summary',
                'game_type',
                'release_date',
                'genres',
                'themes',
                'psn_website',
                'official_website',
                'community_wiki_website',
                'youtube_ids',
            ]
            placeholders = ', '.join(['%s'] * len(fields))
            return f"""
                INSERT INTO app.igdb_game (id, name, {', '.join(fields)})
                VALUES (%s, %s, {placeholders})
                ON CONFLICT (id) DO NOTHING;
            """

        case InsertQueryTypes.INSERT_CANDIDATES:
            return f"""
                    INSERT INTO app.igdb_candidate (psn_game_id, igdb_game_id, score, status)
                    VALUES (%s, %s, %s, %s) ON CONFLICT (psn_game_id, igdb_game_id) DO NOTHING;
                """

        case InsertQueryTypes.INSERT_COLLECTIONS:
            return f"""
                      INSERT INTO app.igdb_collection (id, name)
                      VALUES (%s, %s) ON CONFLICT (id) DO NOTHING;
                """

        case InsertQueryTypes.INSERT_GAME_COLLECTIONS:
            return f"""
                      INSERT INTO app.igdb_game_collection (game_id, collection_id)
                      VALUES (%s, %s) ON CONFLICT (game_id, collection_id) DO NOTHING;
                """

        case InsertQueryTypes.INSERT_COMPANIES:
            return f"""
                      INSERT INTO app.igdb_company (id, name, country_code)
                      VALUES (%s, %s, %s) ON CONFLICT (id) DO NOTHING;
                """

        case InsertQueryTypes.INSERT_GAME_COMPANIES:
            return f"""
                      INSERT INTO app.igdb_game_company (game_id, company_id, role)
                      VALUES (%s, %s, %s) ON CONFLICT (game_id, company_id) DO NOTHING;
                """

        case InsertQueryTypes.INSERT_IMAGES:
            return f"""
                      INSERT INTO app.igdb_image (igdb_game_id, igdb_url, image_type)
                      VALUES (%s, %s, %s) ON CONFLICT (igdb_game_id, igdb_url) DO NOTHING;
                """

        case _:
            raise ValueError(f"Unsupported data type: {query_type}")
