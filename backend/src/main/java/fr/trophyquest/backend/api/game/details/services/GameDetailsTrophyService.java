package fr.trophyquest.backend.api.game.details.services;

import fr.trophyquest.backend.api.game.details.dto.GameTrophyItem;
import fr.trophyquest.backend.api.game.details.mappers.GameTrophyItemMapper;
import fr.trophyquest.backend.domain.repository.EarnedTrophyRepository;
import fr.trophyquest.backend.domain.repository.TrophyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GameDetailsTrophyService {

    private final EarnedTrophyRepository earnedTrophyRepository;
    private final TrophyRepository trophyRepository;
    private final GameTrophyItemMapper gameTrophyItemMapper;

    public GameDetailsTrophyService(EarnedTrophyRepository earnedTrophyRepository,
                                    TrophyRepository trophyRepository,
                                    GameTrophyItemMapper gameTrophyItemMapper) {
        this.earnedTrophyRepository = earnedTrophyRepository;
        this.trophyRepository = trophyRepository;
        this.gameTrophyItemMapper = gameTrophyItemMapper;
    }

    /**
     * Fetch all trophies linked to a suite and earned by a player
     *
     * @param suiteId  ID of the suite
     * @param playerId ID of the player. If not provided, all trophies will be returned with no earned date
     * @return A list of trophies
     */
    public List<GameTrophyItem> fetchTrophiesBySuiteIdAndPlayerId(UUID suiteId, Optional<UUID> playerId) {
        if (playerId.isEmpty()) {
            return this.trophyRepository
                    .findAllBySuiteId(suiteId)
                    .stream()
                    .map(this.gameTrophyItemMapper::fromTrophy)
                    .toList();
        } else {
            return this.earnedTrophyRepository
                    .findAllByTrophySuiteIdAndPlayerId(suiteId, playerId.orElse(null))
                    .stream()
                    .map(this.gameTrophyItemMapper::fromEarnedTrophy)
                    .toList();
        }
    }

}
