package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.api.mapper.RecentGameMapper;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public PaginationDTO<RecentGameDTO> search(int pageNumber, int pageSize) {
        Sort sort = Sort.by(
                Sort.Order.desc("nbPlayers"),
                Sort.Order.desc("lastPlayedAt")
        );
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);
        Page<RecentGameDTO> result = this.recentGameSearchItemRepository.findAll(pageRequest)
                .map(this.recentGameMapper::toDTO);
        return new PaginationDTO<>(result);
    }
}
