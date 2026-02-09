package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.IntegrationTestBase;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.GameImage;
import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import fr.trophyquest.backend.domain.entity.igdb.IgdbImage;
import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbCandidateId;
import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbImageId;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Transactional
public class GameRepositoryTest extends IntegrationTestBase {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private IgdbGameRepository igdbGameRepository;

    @Autowired
    private IgdbCandidateRepository igdbCandidateRepository;

    @Autowired
    private GameImageRepository gameImageRepository;

    @Autowired
    private IgdbImageRepository igdbImageRepository;

    @Test
    void testFetchGamesWithCandidatesByIds_MultipleImages() {
        // Given
        UUID gameId = UUID.randomUUID();
        Game game = new Game();
        game.setId(gameId);
        game.setName("Test Game");
        game.setIgdbMatchStatus("VALIDATION_REQUIRED");
        game = gameRepository.save(game);

        GameImage image1 = new GameImage();
        image1.setId(UUID.randomUUID());
        image1.setGame(game);
        image1.setType("MASTER");
        image1.setPsnUrl("psn_url1");
        gameImageRepository.save(image1);

        GameImage image2 = new GameImage();
        image2.setId(UUID.randomUUID());
        image2.setGame(game);
        image2.setType("OTHER");
        image2.setPsnUrl("psn_url2");
        gameImageRepository.save(image2);

        IgdbGame igdbGame = new IgdbGame();
        igdbGame.setId(123L);
        igdbGame.setName("IGDB Game");
        igdbGame = igdbGameRepository.save(igdbGame);

        IgdbImage igdbImage1 = new IgdbImage();
        IgdbImageId id1 = new IgdbImageId();
        id1.setIgdbGameId(igdbGame.getId());
        id1.setIgdbUrl("url1");
        igdbImage1.setId(id1);
        igdbImage1.setGame(igdbGame);
        igdbImage1.setImageType("cover");
        igdbImageRepository.save(igdbImage1);

        IgdbImage igdbImage2 = new IgdbImage();
        IgdbImageId id2 = new IgdbImageId();
        id2.setIgdbGameId(igdbGame.getId());
        id2.setIgdbUrl("url2");
        igdbImage2.setId(id2);
        igdbImage2.setGame(igdbGame);
        igdbImage2.setImageType("screenshot");
        igdbImageRepository.save(igdbImage2);

        game = gameRepository.findById(gameId).orElseThrow();
        IgdbCandidate candidate = new IgdbCandidate();
        IgdbCandidateId candidateId = new IgdbCandidateId();
        candidateId.setPsnGameId(game.getId());
        candidateId.setCandidateId(igdbGame.getId());
        candidate.setId(candidateId);
        candidate.setGame(game);
        candidate.setCandidate(igdbGame);
        candidate.setScore(100L);
        candidate.setStatus("VALIDATION_REQUIRED");
        igdbCandidateRepository.save(candidate);

        gameRepository.flush();
        igdbCandidateRepository.flush();
        gameImageRepository.flush();
        igdbImageRepository.flush();
        entityManager.clear();

        // When
        List<Game> results = gameRepository.fetchGamesWithCandidatesByIds(List.of(game.getId()));

        // Then
        assertEquals(1, results.size());
        Game resultGame = results.get(0);
        assertEquals(2, resultGame.getImages().size(), "Game should have 2 PSN images");
        assertEquals(1, resultGame.getIgdbCandidates().size(), "Game should have 1 candidate");

        IgdbCandidate resultCandidate = resultGame.getIgdbCandidates().iterator().next();
        assertEquals(2, resultCandidate.getCandidate().getImages().size(), "Game should have 2 IGDB images");

        boolean hasCover = resultCandidate.getCandidate().getImages().stream()
                .anyMatch(img -> "cover".equals(img.getImageType()));
        assertTrue(hasCover, "Should have a cover image");
    }
}
