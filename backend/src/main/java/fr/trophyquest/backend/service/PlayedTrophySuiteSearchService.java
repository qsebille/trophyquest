package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.trophysuite.PlayedTrophySuiteSearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayedTrophySuiteSearchItemMapper;
import fr.trophyquest.backend.repository.PlayedTrophySuiteSearchItemRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PlayedTrophySuiteSearchService {

    private final PlayedTrophySuiteSearchItemRepository repository;
    private final PlayedTrophySuiteSearchItemMapper mapper;

    public PlayedTrophySuiteSearchService(
            PlayedTrophySuiteSearchItemRepository repository,
            PlayedTrophySuiteSearchItemMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public PaginationDTO<PlayedTrophySuiteSearchItemDTO> searchTrophySuitesOfPlayer(UUID playerId, int page, int size) {
        Sort sort = Sort.by("lastPlayedAt").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        return new PaginationDTO<>(this.repository.findAllByIdPlayerId(playerId, pageRequest).map(this.mapper::toDTO));
    }
}
