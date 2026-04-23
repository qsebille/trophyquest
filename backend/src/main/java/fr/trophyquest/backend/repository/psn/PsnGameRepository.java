package fr.trophyquest.backend.repository.psn;

import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.domain.entity.psn.PsnGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PsnGameRepository extends JpaRepository<PsnGame, UUID> {

    @Query("""
                SELECT DISTINCT g.id
                FROM PsnGame g
                WHERE g.igdbMatchStatus = 'VALIDATION_REQUIRED'
                ORDER BY g.id
            """)
    Page<UUID> findGamesWithValidationRequired(Pageable pageable);

    @EntityGraph(attributePaths = {"images", "igdbCandidates.candidate.images"})
    @Query("""
                SELECT DISTINCT g
                FROM PsnGame g
                WHERE g.id IN :ids
                ORDER BY g.id
            """)
    List<PsnGame> fetchGamesWithCandidatesByIds(@Param("ids") List<UUID> ids);

    @Query("""
                SELECT g.id FROM PsnGame g WHERE g.id = (
                    SELECT DISTINCT e.gameId
                    FROM PsnEditionTrophySuite ets
                    JOIN PsnEdition e ON e.id = ets.id.editionId
                    WHERE ets.id.trophySuiteId = :trophySuiteId
                )
            """)
    Optional<UUID> fetchGameIdByTrophySuiteId(@Param("trophySuiteId") UUID trophySuiteId);

    @EntityGraph(attributePaths = {"images", "igdbGame.images", "igdbGame.summary", "igdbGame.genres", "igdbGame.themes"})
    @Query("""
                SELECT g
                FROM PsnGame g
                WHERE g.id = :gameId
            """)
    Optional<PsnGame> fetchGameWithIgdbDetailsById(@Param("gameId") UUID gameId);

    @Query("""
                SELECT new fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO(
                    sum(CASE WHEN g.igdbMatchStatus = 'PENDING' THEN 1 ELSE 0 END),
                    sum(CASE WHEN g.igdbMatchStatus = 'VALIDATION_REQUIRED' THEN 1 ELSE 0 END),
                    sum(CASE WHEN g.igdbMatchStatus = 'NO_FOUND_CANDIDATE' THEN 1 ELSE 0 END),
                    sum(CASE WHEN g.igdbMatchStatus = 'ALL_REFUSED' THEN 1 ELSE 0 END),
                    sum(CASE WHEN g.igdbMatchStatus = 'MATCHED' THEN 1 ELSE 0 END)
                )
                FROM PsnGame g
            """)
    IgdbMappingStatsDTO fetchIgdbMappingStats();

}
