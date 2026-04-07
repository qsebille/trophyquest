package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.domain.entity.Game;
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
public interface GameRepository extends JpaRepository<Game, UUID> {

    @Query("""
                select distinct g.id
                from Game g
                where g.igdbMatchStatus = 'VALIDATION_REQUIRED'
                order by g.id
            """)
    Page<UUID> findGamesWithValidationRequired(Pageable pageable);

    @EntityGraph(attributePaths = {"images", "igdbCandidates.candidate.images"})
    @Query("""
                select distinct g
                from Game g
                where g.id in :ids
                order by g.id
            """)
    List<Game> fetchGamesWithCandidatesByIds(@Param("ids") List<UUID> ids);

    @EntityGraph(attributePaths = {"images", "igdbGame.images", "igdbGame.description", "igdbGame.genres"})
    @Query("""
                select g
                from Game g
                where g.id = (
                    select distinct e.gameId
                    from EditionTrophySuite ets
                    join Edition e on e.id = ets.id.editionId
                    where ets.id.trophySuiteId = :trophySuiteId
                )
            """)
    Optional<Game> fetchGameDetailsForTrophySuite(@Param("trophySuiteId") UUID trophySuiteId);

    @EntityGraph(attributePaths = {"images", "igdbGame.images", "igdbGame.summary", "igdbGame.genres", "igdbGame.themes"})
    @Query("""
                SELECT g
                FROM Game g
                WHERE g.id = :gameId
            """)
    Optional<Game> fetchGameWithIgdbDetailsById(@Param("gameId") UUID gameId);

    @Query("""
                select new fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO(
                    sum(case when g.igdbMatchStatus = 'PENDING' then 1 else 0 end),
                    sum(case when g.igdbMatchStatus = 'VALIDATION_REQUIRED' then 1 else 0 end),
                    sum(case when g.igdbMatchStatus = 'NO_FOUND_CANDIDATE' then 1 else 0 end),
                    sum(case when g.igdbMatchStatus = 'ALL_REFUSED' then 1 else 0 end),
                    sum(case when g.igdbMatchStatus = 'MATCHED' then 1 else 0 end)
                )
                from Game g
            """)
    IgdbMappingStatsDTO fetchIgdbMappingStats();

}
