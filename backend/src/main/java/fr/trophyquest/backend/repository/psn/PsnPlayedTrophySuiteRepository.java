package fr.trophyquest.backend.repository.psn;

import fr.trophyquest.backend.domain.entity.psn.PsnPlayedTrophySuite;
import fr.trophyquest.backend.domain.entity.psn.embedded.PsnPlayedTrophySuiteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface PsnPlayedTrophySuiteRepository extends JpaRepository<PsnPlayedTrophySuite, PsnPlayedTrophySuiteId> {

    @Query("""
            select count( distinct pts.player.id )
            from PsnPlayedTrophySuite pts
            where pts.lastPlayedAt >= :limitDate
            """)
    long countRecentPlayers(@Param("limitDate") Instant limitDate);

    @Query("""
            SELECT e.gameId
            FROM PsnPlayedTrophySuite pts
            JOIN PsnEditionTrophySuite ets ON pts.id.trophySuiteId = ets.id.trophySuiteId
            JOIN PsnEdition e ON ets.id.editionId = e.id
            WHERE pts.player.id = :playerId
            ORDER BY pts.lastPlayedAt DESC
            LIMIT 1
            """)
    UUID findLastPlayedGameIdByPlayer(UUID playerId);
}
