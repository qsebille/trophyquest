package fr.trophyquest.backend.api.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record SearchDTO<T>(
        List<T> content,
        long total
) {
}
