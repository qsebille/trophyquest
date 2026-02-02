package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.trophysuite.PlayedTrophySuiteSearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayedTrophySuiteSearchItemMapper;
import fr.trophyquest.backend.domain.entity.views.PlayedTrophySuiteSearchItem;
import fr.trophyquest.backend.repository.PlayedTrophySuiteSearchItemRepository;
import org.springframework.data.domain.Page;
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

    public SearchDTO<PlayedTrophySuiteSearchItemDTO> searchTrophySuitesOfPlayer(UUID playerId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("lastPlayedAt").descending());
        Page<PlayedTrophySuiteSearchItem> searchResult = repository.findAllByIdPlayerId(playerId, pageRequest);

        return SearchDTO.<PlayedTrophySuiteSearchItemDTO>builder()
                .content(searchResult.getContent().stream().map(mapper::toDTO).toList())
                .total(searchResult.getTotalElements())
                .build();
    }
}
