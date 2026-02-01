package fr.trophyquest.backend.api.dto.trophysuite;

import lombok.Builder;

import java.util.UUID;

@Builder
public record RecentTrophySuiteDTO(
        UUID id,
        String title,
        String image,
        Long recentPlayers
) {
}
