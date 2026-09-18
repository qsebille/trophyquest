package fr.trophyquest.backend.api.association.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record AssociationItem(
        AssociationSuiteItem suite,
        List<AssociationGameItem> games
) {
}
