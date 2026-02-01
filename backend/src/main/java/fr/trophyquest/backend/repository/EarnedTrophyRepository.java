package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.player.PlayerStatsDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO;
import fr.trophyquest.backend.domain.entity.EarnedTrophy;
import fr.trophyquest.backend.domain.entity.embedded.EarnedTrophyId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface EarnedTrophyRepository extends JpaRepository<EarnedTrophy, EarnedTrophyId> {

    @Query("""
              select new fr.trophyquest.backend.api.dto.player.PlayerStatsDTO(
              (
                select count(pts) from PlayedTrophySuite pts where pts.player.id = :playerId),
                sum(case when t.trophyType = 'platinum' then 1 else 0 end),
                sum(case when t.trophyType = 'gold' then 1 else 0 end),
                sum(case when t.trophyType = 'silver' then 1 else 0 end),
                sum(case when t.trophyType = 'bronze' then 1 else 0 end)
              )
              from EarnedTrophy et
              join et.trophy t
              where et.player.id = :playerId
            """)
    PlayerStatsDTO getStatsForPlayer(@Param("playerId") UUID playerId);

    @Query(value = """
            select new fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO(
                t.id,
                t.title,
                t.trophyType,
                t.icon,
                t.description,
                ts.id,
                ts.name,
                et.earnedAt
            )
            from EarnedTrophy et
                join et.trophy t
                join t.trophySuite ts
            where et.player.id = :playerId
            """, countQuery = """
            select count(et)
            from EarnedTrophy et
            where et.player.id = :playerId
            """)
    Page<EarnedTrophySearchItemDTO> searchEarnedTrophiesByPlayer(@Param("playerId") UUID playerId, Pageable pageable);

    @Query("""
            select count(*)
            from EarnedTrophy et
            where et.earnedAt >= :limitDate
            """)
    long countRecent(@Param("limitDate") Instant limitDate);

}
