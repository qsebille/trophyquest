package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PlayerSearchItemDTO(
        UUID id,
        String pseudo,
        String avatar,
        Long totalPlayedGames,
        Long totalEarnedPlatinum,
        Long totalEarnedGold,
        Long totalEarnedSilver,
        Long totalEarnedBronze
) {
}
