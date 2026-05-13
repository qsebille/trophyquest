package fr.trophyquest.backend.domain.repository.psn;

import fr.trophyquest.backend.domain.entity.psn.PsnGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
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
}
