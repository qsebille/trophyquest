package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.domain.entity.views.dim.Game;
import org.springframework.stereotype.Component;

@Component
public class GameMapper {
    public GameSearchItemDTO toGameSearchItemDTO(Game game) {
        return GameSearchItemDTO.builder()
                .id(game.getId())
                .name(game.getName())
                .imageUrl(game.getMasterImageUrl())
                .summary(game.getSummary())
                .genres(game.getGenres())
                .themes(game.getThemes())
                .platforms(game.getPlatforms())
                .website(game.getWebsite())
                .releaseDate(game.getReleaseDate())
                .nbPlayers(game.getNbPlayers())
                .nbTrophySuites(game.getNbTrophySuites())
                .build();
    }

    public GameDetailsDTO toGameDetailsDTO(Game game) {
        return GameDetailsDTO.builder()
                .id(game.getId())
                .name(game.getName())
                .description(game.getSummary())
                .genres(game.getGenres())
                .themes(game.getThemes())
                .releaseDate(game.getReleaseDate())
                .coverUrl(game.getMasterImageUrl())
                .screenshotsUrl(game.getScreenshotsUrl())
                .build();
    }
}
