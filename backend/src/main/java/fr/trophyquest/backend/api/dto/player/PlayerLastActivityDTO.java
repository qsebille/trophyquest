package fr.trophyquest.backend.api.dto.player;

import fr.trophyquest.backend.api.dto.trophy.TrophyDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import lombok.Builder;

@Builder
public record PlayerLastActivityDTO(
        TrophySuiteDTO lastPlayedTrophySuite,
        TrophyDTO lastEarnedTrophy
) {
}
