package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.player.ActivePlayerTrophyDTO;
import fr.trophyquest.backend.api.dto.trophy.PlayerTrophyDTO;
import fr.trophyquest.backend.api.mapper.ActivePlayerTrophyMapper;
import fr.trophyquest.backend.api.mapper.PlayerTrophyMapper;
import fr.trophyquest.backend.domain.repository.views.mart.ActivePlayerTrophyRepository;
import fr.trophyquest.backend.domain.repository.views.mart.PlayerTrophyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlayerTrophyService {
    private final PlayerTrophyRepository playerTrophyRepository;
    private final ActivePlayerTrophyRepository activePlayerRepository;
    private final PlayerTrophyMapper playerTrophyMapper;
    private final ActivePlayerTrophyMapper activePlayerTrophyMapper;

    public PlayerTrophyService(
            PlayerTrophyRepository playerTrophyRepository,
            ActivePlayerTrophyRepository activePlayerRepository,
            PlayerTrophyMapper playerTrophyMapper,
            ActivePlayerTrophyMapper activePlayerTrophyMapper
    ) {
        this.playerTrophyRepository = playerTrophyRepository;
        this.activePlayerRepository = activePlayerRepository;
        this.playerTrophyMapper = playerTrophyMapper;
        this.activePlayerTrophyMapper = activePlayerTrophyMapper;
    }

    public PaginationDTO<PlayerTrophyDTO> searchTrophiesOfPlayer(UUID playerId, int page, int size) {
        Sort sort = Sort.by("earnedAt").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<PlayerTrophyDTO> trophies = this.playerTrophyRepository.findAllByPlayerId(playerId, pageRequest)
                .map(this.playerTrophyMapper::toPlayerTrophyDTO);
        return new PaginationDTO<>(trophies);
    }

    public List<ActivePlayerTrophyDTO> fetchTopActivePlayerTrophies() {
        return this.activePlayerRepository.findAll()
                .stream()
                .map(this.activePlayerTrophyMapper::toActivePlayerTrophyDTO)
                .collect(Collectors.toList());
    }
}
