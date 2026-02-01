package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.api.mapper.RecentGameMapper;
import fr.trophyquest.backend.domain.entity.views.RecentGameSearchItem;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecentGameService {

    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final RecentGameMapper recentGameMapper;

    public RecentGameService(
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            RecentGameMapper recentGameMapper
    ) {
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.recentGameMapper = recentGameMapper;
    }

    public SearchDTO<RecentGameDTO> search(int pageNumber, int pageSize) {
        Sort sort = Sort.by("nbPlayers").descending().and(Sort.by("lastPlayedAt").descending());
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);
        Page<RecentGameSearchItem> recentGames = this.recentGameSearchItemRepository.findAll(pageRequest);
        List<RecentGameDTO> recentGameDTOs = recentGames.getContent()
                .stream()
                .map(this.recentGameMapper::toDTO)
                .toList();
        long total = recentGames.getTotalElements();

        return SearchDTO.<RecentGameDTO>builder().content(recentGameDTOs).total(total).build();
    }

}
