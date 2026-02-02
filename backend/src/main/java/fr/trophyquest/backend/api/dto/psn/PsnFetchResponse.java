package fr.trophyquest.backend.api.dto.psn;

import lombok.Builder;

@Builder
public record PsnFetchResponse(
        String status,
        Integer lambdaStatus,
        Boolean functionError
) {
}
