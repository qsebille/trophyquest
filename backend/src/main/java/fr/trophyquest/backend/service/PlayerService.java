package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.api.mapper.PlayerMapper;
import fr.trophyquest.backend.domain.entity.psn.PsnPlayer;
import fr.trophyquest.backend.domain.repository.PlayerRepository;
import fr.trophyquest.backend.domain.repository.psn.PsnPlayerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PsnPlayerRepository psnPlayerRepository;
    private final PlayerMapper playerMapper;

    public PlayerService(
            PlayerRepository playerRepository,
            PsnPlayerRepository psnPlayerRepository,
            PlayerMapper playerMapper
    ) {
        this.playerRepository = playerRepository;
        this.psnPlayerRepository = psnPlayerRepository;
        this.playerMapper = playerMapper;
    }

    public Pagination<PlayerSearchItemDTO> searchPlayers(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("nbEarnedTrophies").descending());
        Page<PlayerSearchItemDTO> playersPage = this.playerRepository.findAll(pageRequest)
                .map(playerMapper::toPlayerSearchItemDTO);
        return new Pagination<>(playersPage);
    }


    @Transactional
    public void delete(UUID id) {
        PsnPlayer player = this.psnPlayerRepository.findById(id).orElseThrow();
        this.psnPlayerRepository.delete(player);
    }

    public Optional<PlayerDTO> findByPseudo(String pseudo) {
        return this.psnPlayerRepository.findByPseudo(pseudo).map(this.playerMapper::toDTO);
    }
}
