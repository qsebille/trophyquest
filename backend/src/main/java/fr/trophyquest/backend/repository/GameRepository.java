package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.Game;
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
public interface GameRepository extends JpaRepository<Game, UUID> {

    @Query("""
                select distinct g.id
                from Game g
                where g.igdbMatchStatus = 'VALIDATION_REQUIRED'
                order by g.id
            """)
    Page<UUID> findGamesWithValidationRequired(Pageable pageable);

    @Query("""
                select distinct g
                from Game g
                    join fetch g.igdbCandidates c
                    join fetch c.candidate ig
                    join fetch g.images i
                where g.id in :ids
                order by g.id
            """)
    List<Game> fetchGamesWithCandidatesByIds(@Param("ids") List<UUID> ids);

    @Query("""
                select count(g)
                from Game g
                where exists (
                    select 1 from PlayedGame pg
                    where pg.id.gameId = g.id
                    and pg.lastPlayedAt >= :limitDate
                )
            """)
    long countRecentlyPlayed(@Param("limitDate") Instant limitDate);

}
