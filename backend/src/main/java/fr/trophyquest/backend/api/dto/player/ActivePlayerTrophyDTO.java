package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

import java.util.Date;
import java.util.UUID;

@Builder
public record ActivePlayerTrophyDTO(
        UUID id,
        UUID playerId,
        UUID trophyId,
        UUID trophySuiteId,
        UUID gameId,
        String gameName,
        String playerPseudo,
        String playerAvatarUrl,
        String trophyTitle,
        String trophyType,
        String trophyIconUrl,
        Date trophyEarnedAt,
        int nbRecentlyEarnedTrophies
) {
}
