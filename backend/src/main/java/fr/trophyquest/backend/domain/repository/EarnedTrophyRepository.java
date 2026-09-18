package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.EarnedTrophy;
import fr.trophyquest.backend.domain.projection.RecentPlayerProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface EarnedTrophyRepository extends JpaRepository<EarnedTrophy, UUID> {
    @EntityGraph(attributePaths = {"trophy"})
    List<EarnedTrophy> findAllByTrophySuiteIdAndPlayerId(UUID suiteId, UUID playerId);


    @EntityGraph(attributePaths = {"trophy", "trophy.suite"})
    Page<EarnedTrophy> findAllByPlayerId(UUID playerId, Pageable pageable);

    @Query("""
            SELECT
                p.id AS playerId,
                p.pseudo AS pseudo,
                p.avatarUrl AS avatarUrl,
                COUNT(DISTINCT et.trophy.id) FILTER (WHERE et.trophy.color = 'bronze' ) AS nbRecentBronzeTrophies,
                COUNT(DISTINCT et.trophy.id) FILTER (WHERE et.trophy.color = 'silver' ) AS nbRecentSilverTrophies,
                COUNT(DISTINCT et.trophy.id) FILTER (WHERE et.trophy.color = 'gold' ) AS nbRecentGoldTrophies,
                COUNT(DISTINCT et.trophy.id) FILTER (WHERE et.trophy.color = 'platinum' ) AS nbRecentPlatinumTrophies
            FROM EarnedTrophy et
            JOIN et.player p
            WHERE et.earnedAt > :since
            GROUP BY p.id, p.pseudo, p.avatarUrl
            ORDER BY COUNT(DISTINCT et.trophy.id) DESC, MAX(et.earnedAt) DESC
            LIMIT :size
            """)
    List<RecentPlayerProjection> searchTopRecent(@Param("since") Instant since, int size);

}
