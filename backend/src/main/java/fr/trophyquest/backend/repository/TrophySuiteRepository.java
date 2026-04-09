package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO;
import fr.trophyquest.backend.domain.entity.TrophySuite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TrophySuiteRepository extends JpaRepository<TrophySuite, UUID> {
    long countTrophySuiteByAwsImageUrlIsNotNull();

    long countTrophySuiteByAwsImageUrlIsNull();

    @Query("""
            SELECT new fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO(
                ts.id,
                ts.name,
                ts.platforms,
                ts.image,
                SUM(CASE WHEN t.trophyType = 'bronze' THEN 1 ELSE 0 END),
                SUM(CASE WHEN t.trophyType = 'silver' THEN 1 ELSE 0 END),
                SUM(CASE WHEN t.trophyType = 'gold' THEN 1 ELSE 0 END),
                SUM(CASE WHEN t.trophyType = 'platinum' THEN 1 ELSE 0 END)
            )
            FROM TrophySuite ts
            LEFT JOIN ts.trophies t
            WHERE EXISTS (
                SELECT 1
                FROM ts.editions e
                JOIN Edition ed ON ed.id = e.id.editionId
                WHERE ed.gameId = :gameId
                    AND e.edition = ed
            )
            GROUP BY ts.id, ts.name, ts.platforms, ts.image
            """)
    List<TrophySuiteWithCountsDTO> findByGameId(UUID gameId);
}
