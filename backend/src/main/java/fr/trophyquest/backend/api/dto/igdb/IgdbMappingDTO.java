package fr.trophyquest.backend.api.dto.igdb;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record IgdbMappingDTO(
        UUID psnGameId,
        String psnGameName,
        String psnGameImageUrl,
        List<IgdbCandidateDTO> candidates
) {
}
