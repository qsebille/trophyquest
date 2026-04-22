package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayerSearchMapper;
import fr.trophyquest.backend.repository.PlayerSearchItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PlayerSearchService {

    private final PlayerSearchItemRepository playerSearchItemRepository;
    private final PlayerSearchMapper playerSearchMapper;


    public PlayerSearchService(
            PlayerSearchItemRepository playerSearchItemRepository,
            PlayerSearchMapper playerSearchMapper
    ) {
        this.playerSearchItemRepository = playerSearchItemRepository;
        this.playerSearchMapper = playerSearchMapper;
    }

    public PaginationDTO<PlayerSearchItemDTO> searchPlayers(int page, int size) {
        Sort sort = Sort.by("totalEarnedTrophies").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Page<PlayerSearchItemDTO> result = playerSearchItemRepository.findAll(pageRequest)
                .map(playerSearchMapper::toDTO);
        return new PaginationDTO<>(result);
    }
}
