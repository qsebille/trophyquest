package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.api.mapper.GameMapper;
import fr.trophyquest.backend.domain.repository.views.dim.GameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final GameMapper gameMapper;

    public GameService(
            GameRepository gameRepository,
            GameMapper gameMapper
    ) {
        this.gameRepository = gameRepository;
        this.gameMapper = gameMapper;
    }

    public PaginationDTO<GameSearchItemDTO> search(String searchTerm, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(
                Sort.Order.desc("nbPlayers"),
                Sort.Order.asc("name")
        ));
        if (searchTerm == null || searchTerm.isEmpty()) {
            Page<GameSearchItemDTO> result = this.gameRepository.findAll(pageable)
                    .map(this.gameMapper::toGameSearchItemDTO);
            return new PaginationDTO<>(result);
        }

        Page<GameSearchItemDTO> result = this.gameRepository.findGamesByNameContainsIgnoreCase(searchTerm, pageable)
                .map(this.gameMapper::toGameSearchItemDTO);
        return new PaginationDTO<>(result);
    }

    public GameDetailsDTO fetchDetails(UUID gameId) {
        return this.gameRepository.findFirstById(gameId)
                .map(this.gameMapper::toGameDetailsDTO)
                .orElseThrow(() -> new IllegalArgumentException("Game not found with id: " + gameId));
    }
}
