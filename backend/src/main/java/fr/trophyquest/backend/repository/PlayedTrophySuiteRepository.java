package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.PlayedTrophySuite;
import fr.trophyquest.backend.domain.entity.embedded.PlayedTrophySuiteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface PlayedTrophySuiteRepository extends JpaRepository<PlayedTrophySuite, PlayedTrophySuiteId> {

    @Query("""
            select count( distinct pts.player.id )
            from PlayedTrophySuite pts
            where pts.lastPlayedAt >= :limitDate
            """)
    long countRecentPlayers(@Param("limitDate") Instant limitDate);

}
