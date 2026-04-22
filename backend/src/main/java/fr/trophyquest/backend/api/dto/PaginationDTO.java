package fr.trophyquest.backend.api.dto;

import lombok.Builder;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
public record PaginationDTO<T>(
        List<T> content,
        long total,
        long page,
        long size
) {
    public PaginationDTO(Page<T> page) {
        this(page.getContent(), page.getTotalElements(), page.getNumber(), page.getSize());
    }
}
