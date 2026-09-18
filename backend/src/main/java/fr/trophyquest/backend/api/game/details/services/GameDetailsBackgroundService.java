package fr.trophyquest.backend.api.game.details.services;

import fr.trophyquest.backend.api.common.dto.BackgroundImageResponse;
import fr.trophyquest.backend.api.exception.GameNotFoundException;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.repository.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameDetailsBackgroundService {

    private final GameRepository gameRepository;

    public GameDetailsBackgroundService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }


    public BackgroundImageResponse fetchBackgroundByGameId(long gameId) {
        String url = this.gameRepository.findFirstById(gameId)
                .map(Game::getBackgroundUrl)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        return BackgroundImageResponse.builder()
                .url(url)
                .build();
    }

}
