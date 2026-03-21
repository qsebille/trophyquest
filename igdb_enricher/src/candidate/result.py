from dataclasses import dataclass


@dataclass(frozen=True)
class CandidateResultingProcess:
    igdb_game_list: list[dict]
    candidate_list: list[dict]
    match_status: dict
