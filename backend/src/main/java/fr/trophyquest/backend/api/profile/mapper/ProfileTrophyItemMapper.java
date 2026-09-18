package fr.trophyquest.backend.api.profile.mapper;

import fr.trophyquest.backend.api.profile.dto.ProfileTrophyItem;
import fr.trophyquest.backend.domain.entity.EarnedTrophy;
import fr.trophyquest.backend.domain.entity.Trophy;
import org.springframework.stereotype.Component;

@Component
public class ProfileTrophyItemMapper {

    public ProfileTrophyItem fromEarnedTrophy(EarnedTrophy earnedTrophy) {
        Trophy trophy = earnedTrophy.getTrophy();
        return ProfileTrophyItem.builder()
                .trophyId(trophy.getId())
                .suiteId(trophy.getSuite().getId())
                .title(trophy.getTitle())
                .suiteName(trophy.getSuite().getName())
                .description(trophy.getDescription())
                .color(trophy.getColor())
                .iconUrl(trophy.getIconUrl())
                .earnedAt(earnedTrophy.getEarnedAt())
                .build();
    }

}
