package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerStatsDTO;
import fr.trophyquest.backend.api.dto.player.RecentPlayerTrophiesItemDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayerMapper;
import fr.trophyquest.backend.domain.entity.Player;
import fr.trophyquest.backend.domain.projection.RecentPlayerRow;
import fr.trophyquest.backend.exceptions.PlayerNotFoundException;
import fr.trophyquest.backend.repository.EarnedTrophyRepository;
import fr.trophyquest.backend.repository.PlayedTrophySuiteRepository;
import fr.trophyquest.backend.repository.PlayerRepository;
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
    private final PlayedTrophySuiteRepository playedTrophySuiteRepository;
    private final EarnedTrophyRepository earnedTrophyRepository;

    private final PlayerMapper playerMapper;

    public PlayerService(
            PlayerRepository playerRepository,
            PlayedTrophySuiteRepository playedTrophySuiteRepository,
            EarnedTrophyRepository earnedTrophyRepository,
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
        Player player = this.playerRepository.findById(id).orElseThrow();
        return this.playerMapper.toDTO(player);
    }

    @Transactional
    public void delete(UUID id) {
        Player player = this.playerRepository.findById(id).orElseThrow();
        this.playerRepository.delete(player);
    }

    public Optional<PlayerDTO> findByPseudo(String pseudo) {
        return this.playerRepository.findByPseudo(pseudo).map(this.playerMapper::toDTO);
    }

    public PlayerStatsDTO fetchStats(UUID id) {
        return this.earnedTrophyRepository.getStatsForPlayer(id);
    }

    public SearchDTO<EarnedTrophySearchItemDTO> searchEarnedTrophies(UUID playerId, int pageNumber, int pageSize) {
        Player player = this.playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "earnedAt"));
        Page<EarnedTrophySearchItemDTO> searchResult = this.earnedTrophyRepository.searchEarnedTrophiesByPlayer(
                player.getId(), pageRequest);
        return SearchDTO.<EarnedTrophySearchItemDTO>builder()
                .content(searchResult.getContent())
                .total(searchResult.getTotalElements())
                .build();
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
