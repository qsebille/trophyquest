package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.IntegrationTestBase;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.domain.entity.PsnGame;
import fr.trophyquest.backend.domain.entity.PsnGameImage;
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
public class PsnGameRepositoryTest extends IntegrationTestBase {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PsnGameRepository psnGameRepository;

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
        PsnGame game = new PsnGame();
        game.setId(gameId);
        game.setName("Test Game");
        game.setIgdbMatchStatus("VALIDATION_REQUIRED");
        game = psnGameRepository.save(game);

        PsnGameImage image1 = new PsnGameImage();
        image1.setId(UUID.randomUUID());
        image1.setPsnGame(game);
        image1.setType("MASTER");
        image1.setPsnUrl("psn_url1");
        gameImageRepository.save(image1);

        PsnGameImage image2 = new PsnGameImage();
        image2.setId(UUID.randomUUID());
        image2.setPsnGame(game);
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

        game = psnGameRepository.findById(gameId).orElseThrow();
        IgdbCandidate candidate = new IgdbCandidate();
        IgdbCandidateId candidateId = new IgdbCandidateId();
        candidateId.setPsnGameId(game.getId());
        candidateId.setCandidateId(igdbGame.getId());
        candidate.setId(candidateId);
        candidate.setPsnGame(game);
        candidate.setCandidate(igdbGame);
        candidate.setScore(100L);
        candidate.setStatus("VALIDATION_REQUIRED");
        igdbCandidateRepository.save(candidate);

        psnGameRepository.flush();
        igdbCandidateRepository.flush();
        gameImageRepository.flush();
        igdbImageRepository.flush();
        entityManager.clear();

        // When
        List<PsnGame> results = psnGameRepository.fetchGamesWithCandidatesByIds(List.of(game.getId()));

        // Then
        assertEquals(1, results.size());
        PsnGame resultGame = results.getFirst();
        assertEquals(2, resultGame.getImages().size(), "Game should have 2 PSN images");
        assertEquals(1, resultGame.getIgdbCandidates().size(), "Game should have 1 candidate");

        IgdbCandidate resultCandidate = resultGame.getIgdbCandidates().iterator().next();
        assertEquals(2, resultCandidate.getCandidate().getImages().size(), "Game should have 2 IGDB images");

        boolean hasCover = resultCandidate.getCandidate().getImages().stream()
                .anyMatch(img -> "cover".equals(img.getImageType()));
        assertTrue(hasCover, "Should have a cover image");
    }

    @Test
    void testFetchIgdbMappingStats() {
        // Given
        Long igdbGameId = 123L;
        IgdbGame igdbGame = new IgdbGame();
        igdbGame.setId(igdbGameId);
        igdbGame.setName("IGDB Game");

        PsnGame game1 = new PsnGame();
        game1.setId(UUID.randomUUID());
        game1.setName("Game 1");
        game1.setIgdbMatchStatus("PENDING");
        PsnGame game2 = new PsnGame();
        game2.setId(UUID.randomUUID());
        game2.setName("Game 2");
        game2.setIgdbMatchStatus("VALIDATION_REQUIRED");
        PsnGame game3 = new PsnGame();
        game3.setId(UUID.randomUUID());
        game3.setName("Game 3");
        game3.setIgdbMatchStatus("VALIDATION_REQUIRED");
        PsnGame game4 = new PsnGame();
        game4.setId(UUID.randomUUID());
        game4.setName("Game 3");
        game4.setIgdbMatchStatus("NO_FOUND_CANDIDATE");
        PsnGame game5 = new PsnGame();
        game5.setId(UUID.randomUUID());
        game5.setName("Game 3");
        game5.setIgdbMatchStatus("ALL_REFUSED");
        PsnGame game6 = new PsnGame();
        game6.setId(UUID.randomUUID());
        game6.setName("Game 3");
        game6.setIgdbMatchStatus("ALL_REFUSED");
        PsnGame game7 = new PsnGame();
        game7.setId(UUID.randomUUID());
        game7.setName("Game 3");
        game7.setIgdbGame(igdbGame);
        game7.setIgdbMatchStatus("MATCHED");
        PsnGame game8 = new PsnGame();
        game8.setId(UUID.randomUUID());
        game8.setName("Game 3");
        game8.setIgdbGame(igdbGame);
        game8.setIgdbMatchStatus("MATCHED");
        PsnGame game9 = new PsnGame();
        game9.setId(UUID.randomUUID());
        game9.setName("Game 3");
        game9.setIgdbGame(igdbGame);
        game9.setIgdbMatchStatus("MATCHED");

        igdbGameRepository.save(igdbGame);
        psnGameRepository.saveAll(List.of(game1, game2, game3, game4, game5, game6, game7, game8, game9));

        igdbGameRepository.flush();
        psnGameRepository.flush();

        IgdbMappingStatsDTO stats = this.psnGameRepository.fetchIgdbMappingStats();

        assertEquals(1, stats.pending(), "Stats should display 1 pending games");
        assertEquals(2, stats.validationRequired(), "Stats should display 2 validation required games");
        assertEquals(1, stats.noFoundCandidate(), "Stats should display 1 no found candidate games");
        assertEquals(2, stats.allRefused(), "Stats should display 2 all refused games");
        assertEquals(3, stats.matched(), "Stats should display 3 matched games");
    }
}
