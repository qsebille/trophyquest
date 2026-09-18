package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.domain.entity.Game;
import org.springframework.stereotype.Component;

@Component
public class GameMapper {
    public GameSearchItemDTO toGameSearchItemDTO(Game game) {
        return GameSearchItemDTO.builder()
                .id(game.getId())
                .name(game.getName())
                .coverUrl(game.getCoverUrl())
                .summary(game.getSummary())
                .genres(game.getGenres())
                .themes(game.getThemes())
                .platforms(game.getPlatforms())
                .officialWebsite(game.getOfficialWebsite())
                .wikiaWebsite(game.getWikiaWebsite())
                .releaseDate(game.getReleaseDate())
                .nbPlayers(game.getNbPlayers())
                .nbTrophySuites(game.getNbSuites())
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
                .coverUrl(game.getCoverUrl())
                .screenshotsUrl(game.getScreenshotsUrl())
                .build();
    }
}
