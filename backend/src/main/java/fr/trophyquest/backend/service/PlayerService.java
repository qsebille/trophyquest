package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerStatsDTO;
import fr.trophyquest.backend.api.dto.player.RecentPlayerTrophiesItemDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayerMapper;
import fr.trophyquest.backend.domain.entity.psn.PsnPlayer;
import fr.trophyquest.backend.domain.projection.RecentPlayerRow;
import fr.trophyquest.backend.exceptions.PlayerNotFoundException;
import fr.trophyquest.backend.repository.PlayerRepository;
import fr.trophyquest.backend.repository.psn.PsnEarnedTrophyRepository;
import fr.trophyquest.backend.repository.psn.PsnPlayedTrophySuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PsnPlayedTrophySuiteRepository playedTrophySuiteRepository;
    private final PsnEarnedTrophyRepository earnedTrophyRepository;

    private final PlayerMapper playerMapper;

    public PlayerService(
            PlayerRepository playerRepository,
            PsnPlayedTrophySuiteRepository playedTrophySuiteRepository,
            PsnEarnedTrophyRepository earnedTrophyRepository,
            PlayerMapper playerMapper
    ) {
        this.playerRepository = playerRepository;
        this.playedTrophySuiteRepository = playedTrophySuiteRepository;
        this.earnedTrophyRepository = earnedTrophyRepository;
        this.playerMapper = playerMapper;
    }

    public long count() {
        return this.playerRepository.count();
    }

    public long countRecentlyActive() {
        Instant limitDate = Instant.now().minus(7, ChronoUnit.DAYS);
        return this.playedTrophySuiteRepository.countRecentPlayers(limitDate);
    }

    public PlayerDTO fetch(UUID id) {
        PsnPlayer player = this.playerRepository.findById(id).orElseThrow();
        return this.playerMapper.toDTO(player);
    }

    @Transactional
    public void delete(UUID id) {
        PsnPlayer player = this.playerRepository.findById(id).orElseThrow();
        this.playerRepository.delete(player);
    }

    public Optional<PlayerDTO> findByPseudo(String pseudo) {
        return this.playerRepository.findByPseudo(pseudo).map(this.playerMapper::toDTO);
    }

    public PlayerStatsDTO fetchStats(UUID id) {
        return this.earnedTrophyRepository.getStatsForPlayer(id);
    }

    public PaginationDTO<EarnedTrophySearchItemDTO> searchEarnedTrophies(UUID playerId, int pageNumber, int pageSize) {
        Sort sort = Sort.by(Sort.Order.desc("earnedAt"));
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);

        PsnPlayer player = this.playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException(playerId));
        Page<EarnedTrophySearchItemDTO> result = this.earnedTrophyRepository.searchEarnedTrophiesByPlayer(player.getId(), pageRequest);
        return new PaginationDTO<>(result);
    }

    public List<RecentPlayerTrophiesItemDTO> fetchTopRecent(int playerLimit, int trophyLimit) {
        Instant limitDate = Instant.now().minus(7, ChronoUnit.DAYS);
        List<RecentPlayerRow> rows = this.playerRepository.searchRecentPlayerTrophies(
                playerLimit, trophyLimit, limitDate);

        Map<UUID, RecentPlayerTrophiesItemDTO> players = new LinkedHashMap<>();

        for (RecentPlayerRow row : rows) {
            EarnedTrophySearchItemDTO trophy = EarnedTrophySearchItemDTO.builder()
                    .id(row.getTrophyId())
                    .title(row.getTrophyTitle())
                    .trophyType(row.getTrophyType())
                    .icon(row.getTrophyIcon())
                    .description(row.getTrophyDescription())
                    .trophySuiteId(row.getTrophySuiteId())
                    .trophySuiteTitle(row.getTrophySuiteTitle())
                    .earnedAt(row.getEarnedAt())
                    .build();

            RecentPlayerTrophiesItemDTO item = players.computeIfAbsent(
                    row.getPlayerId(), k -> {
                        PlayerDTO player = PlayerDTO.builder()
                                .id(row.getPlayerId())
                                .pseudo(row.getPseudo())
                                .avatar(row.getAvatar())
                                .build();
                        return RecentPlayerTrophiesItemDTO.builder()
                                .player(player)
                                .recentTrophyCount(row.getRecentTrophyCount())
                                .lastTrophies(new java.util.ArrayList<>())
                                .build();
                    }
            );

            item.lastTrophies().add(trophy);
        }

        return players.values().stream().toList();
    }

}
