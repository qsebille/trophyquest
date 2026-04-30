package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.player.PlayedGameDTO;
import fr.trophyquest.backend.api.mapper.PlayedGameMapper;
import fr.trophyquest.backend.domain.repository.views.fact.PlayedGameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PlayedGameService {
    private final PlayedGameRepository playedGameRepository;
    private final PlayedGameMapper playedGameMapper;

    public PlayedGameService(
            PlayedGameRepository playedGameRepository,
            PlayedGameMapper playedGameMapper
    ) {
        this.playedGameRepository = playedGameRepository;
        this.playedGameMapper = playedGameMapper;
    }

    public PaginationDTO<PlayedGameDTO> searchRecentPlayers(UUID gameId, int page, int size) {
        Pageable pagination = PageRequest.of(page, size, Sort.by("lastPlayedAt").descending());
        Page<PlayedGameDTO> playedGames = this.playedGameRepository.findAllByGameId(gameId, pagination)
                .map(this.playedGameMapper::toDTO);

        return new PaginationDTO<>(playedGames);
    }
}
