package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.trophysuite.PlayedTrophySuiteSearchItemDTO;
import fr.trophyquest.backend.domain.entity.views.PlayedTrophySuiteSearchItem;
import org.springframework.stereotype.Component;

@Component
public class PlayedTrophySuiteSearchItemMapper {

    public PlayedTrophySuiteSearchItemDTO toDTO(PlayedTrophySuiteSearchItem entity) {
        return PlayedTrophySuiteSearchItemDTO.builder()
                .id(entity.getId().getTrophySuiteId())
                .name(entity.getTrophySuiteName())
                .platforms(entity.getTrophySuitePlatforms())
                .imageUrl(entity.getImageUrl())
                .lastPlayedAt(entity.getLastPlayedAt())
                .totalTrophies(entity.getTotalTrophies())
                .totalEarnedPlatinum(entity.getTotalEarnedPlatinum())
                .totalEarnedGold(entity.getTotalEarnedGold())
                .totalEarnedSilver(entity.getTotalEarnedSilver())
                .totalEarnedBronze(entity.getTotalEarnedBronze())
                .build();
    }

}
