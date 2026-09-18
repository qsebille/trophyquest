package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.PlayedGame;
import fr.trophyquest.backend.domain.projection.RecentGameProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface PlayedGameRepository extends JpaRepository<PlayedGame, UUID> {
    Page<PlayedGame> findByGameId(long gameId, Pageable pageable);

    @Query("""
            SELECT
                g.id AS gameId,
                g.name AS title,
                g.coverUrl AS coverUrl,
                g.backgroundUrl AS backgroundUrl,
                COUNT(DISTINCT pg.player.id) AS nbRecentPlayers,
                MAX(pg.lastPlayedAt) AS lastPlayedAt
            FROM PlayedGame pg
            JOIN pg.game g
            WHERE pg.lastPlayedAt > :since
            GROUP BY g.id, g.name, g.coverUrl, g.backgroundUrl
            ORDER BY COUNT(DISTINCT pg.player.id) DESC, MAX(pg.lastPlayedAt) DESC
            LIMIT :size
            """)
    List<RecentGameProjection> searchTopRecent(@Param("since") Instant since, int size);
}
