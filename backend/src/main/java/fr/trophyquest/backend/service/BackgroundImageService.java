package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.BackgroundImageDTO;
import fr.trophyquest.backend.domain.entity.views.dim.Game;
import fr.trophyquest.backend.domain.entity.views.mart.RecentGame;
import fr.trophyquest.backend.domain.repository.views.dim.GameRepository;
import fr.trophyquest.backend.domain.repository.views.mart.PlayerTrophySuiteRepository;
import fr.trophyquest.backend.domain.repository.views.mart.RecentGameRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BackgroundImageService {
    private final RecentGameRepository recentGameRepository;
    private final GameRepository gameRepository;
    private final PlayerTrophySuiteRepository playerTrophySuiteRepository;

    public BackgroundImageService(
            GameRepository gameRepository,
            RecentGameRepository recentGameRepository,
            PlayerTrophySuiteRepository playerTrophySuiteRepository
    ) {
        this.gameRepository = gameRepository;
        this.recentGameRepository = recentGameRepository;
        this.playerTrophySuiteRepository = playerTrophySuiteRepository;
    }

    public BackgroundImageDTO fetchTopPlayedGameBackgroundUrl() {
        Sort sort = Sort.by(Sort.Direction.DESC, "nbPlayers", "lastPlayedAt");
        Pageable pageable = PageRequest.of(0, 1, sort);
        RecentGame topRecentGame = this.recentGameRepository.findAll(pageable).getContent().getFirst();
        return BackgroundImageDTO.builder().url(topRecentGame.getBackgroundImageUrl()).build();
    }

    public BackgroundImageDTO fetchLastPlayedTrophySuiteOfPlayer(UUID playerId) {
        Sort sort = Sort.by(Sort.Direction.DESC, "lastPlayedAt");
        Pageable pageable = PageRequest.of(0, 1, sort);
        String url = this.playerTrophySuiteRepository.findAllByPlayerId(playerId, pageable).getContent().getFirst().getGameBackgroundImageUrl();
        return BackgroundImageDTO.builder().url(url).build();
    }

    public BackgroundImageDTO fetchForGame(UUID gameId) {
        Game game = this.gameRepository.findById(gameId).orElseThrow();
        return BackgroundImageDTO.builder().url(game.getBackgroundImageUrl()).build();
    }
}
