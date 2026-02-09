package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.GameImageDTO;
import fr.trophyquest.backend.api.dto.game.TrophySuiteGameDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.GameImage;
import fr.trophyquest.backend.domain.entity.TrophySuite;
import fr.trophyquest.backend.domain.entity.igdb.IgdbImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TrophySuiteMapper {

    public TrophySuiteDTO toDTO(TrophySuite trophySuite) {
        return TrophySuiteDTO.builder()
                .id(trophySuite.getId())
                .title(trophySuite.getName())
                .image(trophySuite.getImage())
                .platforms(trophySuite.getPlatforms())
                .build();
    }

    public TrophySuiteGameDTO toGameDTO(Game game) {
        List<GameImageDTO> images = game.getImages()
                .stream()
                .map(this::toGameImageDTO)
                .collect(Collectors.toList());

        if (null != game.getIgdbGame()) {
            images.addAll(game.getIgdbGame().getImages()
                                  .stream()
                                  .map(this::toGameImageDTO)
                                  .toList());
        }

        return TrophySuiteGameDTO.builder()
                .id(game.getId())
                .name(game.getName())
                .images(images)
                .build();
    }

    private GameImageDTO toGameImageDTO(IgdbImage image) {
        return GameImageDTO.builder()
                .imageUrl(image.getImageUrl())
                .imageType(image.getImageType())
                .source("IGDB")
                .build();
    }

    private GameImageDTO toGameImageDTO(GameImage image) {
        return GameImageDTO.builder()
                .imageUrl(image.getUrl())
                .imageType(image.getType())
                .source("PSN")
                .build();
    }
}
