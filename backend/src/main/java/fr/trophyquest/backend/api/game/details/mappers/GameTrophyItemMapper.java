package fr.trophyquest.backend.api.game.details.mappers;

import fr.trophyquest.backend.api.game.details.dto.GameTrophyItem;
import fr.trophyquest.backend.domain.entity.EarnedTrophy;
import fr.trophyquest.backend.domain.entity.Trophy;
import org.springframework.stereotype.Component;

@Component
public class GameTrophyItemMapper {
    public GameTrophyItemMapper() {
    }

    public GameTrophyItem fromTrophy(Trophy trophy) {
        return GameTrophyItem.builder()
                .trophyId(trophy.getId())
                .rank(trophy.getRank())
                .title(trophy.getTitle())
                .description(trophy.getDescription())
                .color(trophy.getColor())
                .iconUrl(trophy.getIconUrl())
                .isHidden(trophy.getIsHidden())
                .groupName(trophy.getGroupName())
                .build();
    }

    public GameTrophyItem fromEarnedTrophy(EarnedTrophy earnedTrophy) {
        return GameTrophyItem.builder()
                .trophyId(earnedTrophy.getTrophy().getId())
                .rank(earnedTrophy.getTrophy().getRank())
                .title(earnedTrophy.getTrophy().getTitle())
                .description(earnedTrophy.getTrophy().getDescription())
                .color(earnedTrophy.getTrophy().getColor())
                .iconUrl(earnedTrophy.getTrophy().getIconUrl())
                .isHidden(earnedTrophy.getTrophy().getIsHidden())
                .groupName(earnedTrophy.getTrophy().getGroupName())
                .earnedAt(earnedTrophy.getEarnedAt())
                .build();
    }

}
