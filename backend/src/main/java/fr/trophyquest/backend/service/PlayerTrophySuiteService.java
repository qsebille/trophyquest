package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.trophysuite.PlayerTrophySuiteDTO;
import fr.trophyquest.backend.api.mapper.PlayerTrophySuiteMapper;
import fr.trophyquest.backend.domain.repository.views.mart.PlayerTrophySuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PlayerTrophySuiteService {
    private final PlayerTrophySuiteRepository playerTrophySuiteRepository;
    private final PlayerTrophySuiteMapper playerTrophySuiteMapper;

    public PlayerTrophySuiteService(
            PlayerTrophySuiteRepository playerTrophySuiteRepository,
            PlayerTrophySuiteMapper playerTrophySuiteMapper
    ) {
        this.playerTrophySuiteRepository = playerTrophySuiteRepository;
        this.playerTrophySuiteMapper = playerTrophySuiteMapper;
    }

    public PaginationDTO<PlayerTrophySuiteDTO> searchTrophySuitesOfPlayer(UUID playerId, int page, int size) {
        Sort sort = Sort.by("lastPlayedAt").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<PlayerTrophySuiteDTO> playerTrophySuites = this.playerTrophySuiteRepository.findAllByPlayerId(playerId, pageRequest)
                .map(this.playerTrophySuiteMapper::toPlayerTrophySuiteDTO);
        return new PaginationDTO<>(playerTrophySuites);
    }
}
