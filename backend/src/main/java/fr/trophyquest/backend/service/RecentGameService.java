package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.api.mapper.RecentGameMapper;
import fr.trophyquest.backend.domain.entity.views.mart.RecentGame;
import fr.trophyquest.backend.domain.repository.views.mart.RecentGameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RecentGameService {

    private final RecentGameRepository recentGameRepository;
    private final RecentGameMapper recentGameMapper;

    public RecentGameService(
            RecentGameRepository recentGameRepository,
            RecentGameMapper recentGameMapper
    ) {
        this.recentGameRepository = recentGameRepository;
        this.recentGameMapper = recentGameMapper;
    }

    public PaginationDTO<RecentGameDTO> search(int pageNumber, int pageSize) {
        Sort sort = Sort.by(
                Sort.Order.desc("nbPlayers"),
                Sort.Order.desc("lastPlayedAt")
        );
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);
        Page<RecentGame> result = this.recentGameRepository.findAllPlayed(pageRequest);
        return new PaginationDTO<>(result.map(this.recentGameMapper::toRecentGameDTO));
    }
}
