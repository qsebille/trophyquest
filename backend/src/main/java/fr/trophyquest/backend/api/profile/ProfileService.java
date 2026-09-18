package fr.trophyquest.backend.api.profile;

import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.exception.PlayerNotFoundException;
import fr.trophyquest.backend.api.profile.dto.ProfileDetailsResponse;
import fr.trophyquest.backend.api.profile.dto.ProfileSuiteItem;
import fr.trophyquest.backend.api.profile.dto.ProfileTrophyItem;
import fr.trophyquest.backend.api.profile.mapper.ProfileDetailsResponseMapper;
import fr.trophyquest.backend.api.profile.mapper.ProfileSuiteItemMapper;
import fr.trophyquest.backend.api.profile.mapper.ProfileTrophyItemMapper;
import fr.trophyquest.backend.domain.entity.EarnedTrophy;
import fr.trophyquest.backend.domain.entity.PlayedSuite;
import fr.trophyquest.backend.domain.repository.EarnedTrophyRepository;
import fr.trophyquest.backend.domain.repository.PlayedSuiteRepository;
import fr.trophyquest.backend.domain.repository.PlayerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProfileService {

    private final PlayerRepository playerRepository;
    private final PlayedSuiteRepository playedSuiteRepository;
    private final EarnedTrophyRepository earnedTrophyRepository;
    private final ProfileDetailsResponseMapper profileDetailsResponseMapper;
    private final ProfileSuiteItemMapper profileSuiteItemMapper;
    private final ProfileTrophyItemMapper profileTrophyItemMapper;

    public ProfileService(PlayerRepository playerRepository,
                          PlayedSuiteRepository playedSuiteRepository,
                          EarnedTrophyRepository earnedTrophyRepository,
                          ProfileDetailsResponseMapper profileDetailsResponseMapper,
                          ProfileSuiteItemMapper profileSuiteItemMapper,
                          ProfileTrophyItemMapper profileTrophyItemMapper) {
        this.playerRepository = playerRepository;
        this.playedSuiteRepository = playedSuiteRepository;
        this.profileDetailsResponseMapper = profileDetailsResponseMapper;
        this.earnedTrophyRepository = earnedTrophyRepository;
        this.profileSuiteItemMapper = profileSuiteItemMapper;
        this.profileTrophyItemMapper = profileTrophyItemMapper;
    }

    /**
     * Fetch a player's summary.
     *
     * @param playerId ID of the player.
     * @return The detials about the player.
     */
    public ProfileDetailsResponse fetchDetails(UUID playerId) {
        return playerRepository.findFirstById(playerId)
                .map(profileDetailsResponseMapper::fromPlayer)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
    }

    /**
     * Search suites played by a player, in descending order of last played date.
     *
     * @param playerId ID of the player.
     * @param page     Page number.
     * @param size     Number of items per page.
     * @return A pagination object containing the list of suites and the total number of suites.
     */
    public Pagination<ProfileSuiteItem> searchSuites(UUID playerId, int page, int size) {
        Sort sort = Sort.by("lastPlayedAt").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<PlayedSuite> result = playedSuiteRepository.findAllByPlayerId(playerId, pageRequest);

        List<ProfileSuiteItem> suites = result.stream()
                .map(profileSuiteItemMapper::fromPlayedSuite)
                .toList();

        return Pagination.<ProfileSuiteItem>builder()
                .content(suites)
                .total(result.getTotalElements())
                .page(page)
                .size(size)
                .build();
    }


    /**
     * Search trophies earned by a player, in descending order of earned date.
     *
     * @param playerId ID of the player
     * @param page     Page number.
     * @param size     Number of trophies to return.
     * @return A pagination object containing the list of trophies and the total number of trophies.
     */
    public Pagination<ProfileTrophyItem> searchTrophies(UUID playerId, int page, int size) {
        Sort sort = Sort.by("earnedAt").descending().and(Sort.by("trophy.rank").ascending());
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<EarnedTrophy> result = earnedTrophyRepository.findAllByPlayerId(playerId, pageRequest);

        List<ProfileTrophyItem> trophies = result.stream()
                .map(profileTrophyItemMapper::fromEarnedTrophy)
                .toList();

        return Pagination.<ProfileTrophyItem>builder()
                .content(trophies)
                .total(result.getTotalElements())
                .page(page)
                .size(size)
                .build();
    }

}
