package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PlayerSearchItemDTO(
        UUID id,
        String pseudo,
        String avatar,
        int nbPlayedGames,
        int nbEarnedPlatinum,
        int nbEarnedGold,
        int nbEarnedSilver,
        int nbEarnedBronze
) {
}
