package fr.trophyquest.backend.api.dto.trophysuite;

import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Builder
public record PlayerSuiteDTO(
        UUID id,
        long gameId,
        String name,
        List<String> platforms,
        String imageUrl,
        Instant lastPlayedAt,
        int nbTrophies,
        int nbEarnedPlatinum,
        int nbEarnedGold,
        int nbEarnedSilver,
        int nbEarnedBronze
) {
}
