package fr.trophyquest.backend.api.association.dto;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record AssociationSuiteItem(
        UUID suiteId,
        String title,
        String imageUrl,
        List<String> platforms,
        String lastPlayerPseudo,
        String lastPlayerAvatar,
        int nbTrophies
) {
}
