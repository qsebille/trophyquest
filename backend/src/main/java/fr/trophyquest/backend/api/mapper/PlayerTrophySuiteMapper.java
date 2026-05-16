package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.trophysuite.PlayerTrophySuiteDTO;
import fr.trophyquest.backend.domain.entity.views.mart.PlayerTrophySuite;
import org.springframework.stereotype.Component;

@Component
public class PlayerTrophySuiteMapper {

    public PlayerTrophySuiteDTO toPlayerTrophySuiteDTO(PlayerTrophySuite entity) {
        int nbTrophies = entity.getNbPlatinum() + entity.getNbGold() + entity.getNbSilver() + entity.getNbBronze();
        return PlayerTrophySuiteDTO.builder()
                .id(entity.getTrophySuiteId())
                .gameId(entity.getGameId())
                .name(entity.getName())
                .platforms(entity.getPlatforms())
                .imageUrl(entity.getImageUrl())
                .lastPlayedAt(entity.getLastPlayedAt())
                .nbTrophies(nbTrophies)
                .nbEarnedPlatinum(entity.getNbEarnedPlatinum())
                .nbEarnedGold(entity.getNbEarnedGold())
                .nbEarnedSilver(entity.getNbEarnedSilver())
                .nbEarnedBronze(entity.getNbEarnedBronze())
                .build();
    }

}
