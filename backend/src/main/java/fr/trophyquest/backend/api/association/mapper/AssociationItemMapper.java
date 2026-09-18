package fr.trophyquest.backend.api.association.mapper;

import fr.trophyquest.backend.api.association.dto.AssociationGameItem;
import fr.trophyquest.backend.api.association.dto.AssociationItem;
import fr.trophyquest.backend.api.association.dto.AssociationSuiteItem;
import fr.trophyquest.backend.domain.entity.IgdbGame;
import fr.trophyquest.backend.domain.entity.Suite;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssociationItemMapper {

    public AssociationItem fromSuite(Suite suite) {
        int nbTrophies = suite.getNbBronzeTrophies() +
                suite.getNbSilverTrophies() +
                suite.getNbGoldTrophies() +
                suite.getNbPlatinumTrophies();

        AssociationSuiteItem suiteItem = AssociationSuiteItem.builder()
                .suiteId(suite.getId())
                .title(suite.getName())
                .imageUrl(suite.getImageUrl())
                .platforms(suite.getPlatforms())
                .lastPlayerPseudo(suite.getLastPlayer().getPseudo())
                .lastPlayerAvatar(suite.getLastPlayer().getAvatarUrl())
                .nbTrophies(nbTrophies)
                .build();

        List<AssociationGameItem> games = suite.getCandidates().stream()
                .map(candidate -> {
                    IgdbGame game = candidate.getGame();
                    return AssociationGameItem.builder()
                            .gameId(game.getId())
                            .title(game.getName())
                            .description(game.getSummary())
                            .platforms(game.getPlatforms())
                            .genres(game.getGenres())
                            .themes(game.getThemes())
                            .coverUrl(game.getCoverUrl())
                            .releaseDate(game.getReleaseDate())
                            .gameType(game.getGameType())
                            .score(candidate.getScore())
                            .build();
                })
                .toList();

        return AssociationItem.builder()
                .suite(suiteItem)
                .games(games)
                .build();
    }
}
