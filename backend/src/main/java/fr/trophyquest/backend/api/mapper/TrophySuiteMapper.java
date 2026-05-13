package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.domain.entity.views.dim.TrophySuite;
import org.springframework.stereotype.Component;

@Component
public class TrophySuiteMapper {

    public TrophySuiteDTO toDTO(TrophySuite trophySuite) {
        return TrophySuiteDTO.builder()
                .id(trophySuite.getId())
                .title(trophySuite.getName())
                .platforms(trophySuite.getPlatforms())
                .imageUrl(trophySuite.getImageUrl())
                .nbPlatinumTrophies(trophySuite.getNbPlatinumTrophies())
                .nbGoldTrophies(trophySuite.getNbGoldTrophies())
                .nbSilverTrophies(trophySuite.getNbSilverTrophies())
                .nbBronzeTrophies(trophySuite.getNbBronzeTrophies())
                .build();
    }

}
