package fr.trophyquest.backend.api.dto.player;

import fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO;
import lombok.Builder;

import java.util.List;

@Builder
public record RecentPlayerTrophiesItemDTO(
        PlayerDTO player,
        Long recentTrophyCount,
        List<EarnedTrophySearchItemDTO> lastTrophies
) {
}
