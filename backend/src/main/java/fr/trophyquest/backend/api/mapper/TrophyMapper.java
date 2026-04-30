package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.trophy.TrophyDTO;
import fr.trophyquest.backend.domain.entity.views.dim.Trophy;
import fr.trophyquest.backend.domain.entity.views.fact.EarnedTrophy;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class TrophyMapper {

    public TrophyDTO toDTO(Trophy trophy, List<EarnedTrophy> earnedTrophies) {
        Map<UUID, Date> earnedAtMap = earnedTrophies.stream()
                .collect(Collectors.toMap(EarnedTrophy::getTrophyId, EarnedTrophy::getEarnedAt));
        return TrophyDTO.builder()
                .id(trophy.getId())
                .rank(trophy.getRank())
                .title(trophy.getTitle())
                .description(trophy.getDescription())
                .trophyType(trophy.getTrophyType())
                .isHidden(trophy.getIsHidden())
                .iconUrl(trophy.getIconUrl())
                .groupType(trophy.getGroupType())
                .groupName(trophy.getGroupName())
                .earnedAt(earnedAtMap.getOrDefault(trophy.getId(), null))
                .build();
    }

}
