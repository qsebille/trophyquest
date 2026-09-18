package fr.trophyquest.backend.api.common.dto;

import lombok.Builder;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
public record Pagination<T>(
        List<T> content,
        long total,
        long page,
        long size
) {
    public Pagination(Page<T> page) {
        this(page.getContent(), page.getTotalElements(), page.getNumber(), page.getSize());
    }
}
