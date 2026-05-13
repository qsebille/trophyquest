package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.trophy.PlayerTrophyDTO;
import fr.trophyquest.backend.domain.entity.views.mart.PlayerTrophy;
import org.springframework.stereotype.Component;

@Component
public class PlayerTrophyMapper {

    public PlayerTrophyDTO toPlayerTrophyDTO(PlayerTrophy entity) {
        return PlayerTrophyDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .trophyType(entity.getTrophyType())
                .icon(entity.getIconUrl())
                .description(entity.getDescription())
                .trophySuiteId(entity.getTrophySuiteId())
                .trophySuiteTitle(entity.getTrophySuiteName())
                .earnedAt(entity.getEarnedAt())
                .build();
    }

}
