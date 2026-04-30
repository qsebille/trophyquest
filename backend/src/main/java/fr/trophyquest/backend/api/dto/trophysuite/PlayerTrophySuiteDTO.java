package fr.trophyquest.backend.api.dto.trophysuite;

import lombok.Builder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public record PlayerTrophySuiteDTO(
        UUID id,
        UUID gameId,
        String name,
        List<String> platforms,
        String imageUrl,
        Date lastPlayedAt,
        int nbTrophies,
        int nbEarnedPlatinum,
        int nbEarnedGold,
        int nbEarnedSilver,
        int nbEarnedBronze
) {
}
