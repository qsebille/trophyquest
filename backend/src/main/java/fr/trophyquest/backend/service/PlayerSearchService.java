package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayerSearchMapper;
import fr.trophyquest.backend.domain.entity.views.PlayerSearchItem;
import fr.trophyquest.backend.repository.PlayerSearchItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public SearchDTO<PlayerSearchItemDTO> searchPlayers(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("totalEarnedTrophies").descending());
        Page<PlayerSearchItem> playerSearchItems = playerSearchItemRepository.findAll(pageRequest);
        List<PlayerSearchItemDTO> content = playerSearchItems.getContent()
                .stream()
                .map(playerSearchMapper::toDTO)
                .toList();

        return SearchDTO.<PlayerSearchItemDTO>builder()
                .content(content)
                .total(playerSearchItems.getTotalElements())
                .build();
    }
}
