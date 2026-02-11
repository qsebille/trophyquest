package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.PlayedTrophySuite;
import fr.trophyquest.backend.domain.entity.embedded.PlayedTrophySuiteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface PlayedTrophySuiteRepository extends JpaRepository<PlayedTrophySuite, PlayedTrophySuiteId> {

    @Query("""
            select count( distinct pts.player.id )
            from PlayedTrophySuite pts
            where pts.lastPlayedAt >= :limitDate
            """)
    long countRecentPlayers(@Param("limitDate") Instant limitDate);

    @Query("""
            SELECT e.gameId
            FROM PlayedTrophySuite pts
            JOIN EditionTrophySuite ets ON pts.id.trophySuiteId = ets.id.trophySuiteId
            JOIN Edition e ON ets.id.editionId = e.id
            WHERE pts.player.id = :playerId
            ORDER BY pts.lastPlayedAt DESC
            LIMIT 1
            """)
    UUID findLastPlayedGameIdByPlayer(UUID playerId);
}
