package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameImageDTO;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.GameImage;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import fr.trophyquest.backend.domain.entity.igdb.IgdbImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
public class GameDetailsMapper {

    public GameDetailsDTO toDTO(Game game) {
        List<GameImageDTO> psnImages = game.getImages()
                .stream()
                .map(this::toGameImageDTO)
                .toList();

        GameDetailsDTO.GameDetailsDTOBuilder builder = GameDetailsDTO.builder()
                .id(game.getId())
                .name(game.getName());

        IgdbGame igdbGame = game.getIgdbGame();
        // Adds IGDB data to game DTO if present
        if (null != igdbGame) {
            List<GameImageDTO> igdbImages = igdbGame.getImages()
                    .stream()
                    .map(this::toGameImageDTO)
                    .toList();
            return builder
                    .description(igdbGame.getSummary())
                    .genres(igdbGame.getGenres())
                    .themes(igdbGame.getThemes())
                    .releaseDate(igdbGame.getReleaseDate())
                    .images(Stream.concat(psnImages.stream(), igdbImages.stream()).toList())
                    .build();
        }

        return builder
                .images(psnImages)
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
