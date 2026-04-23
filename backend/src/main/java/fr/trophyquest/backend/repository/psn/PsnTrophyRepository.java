package fr.trophyquest.backend.repository.psn;

import fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO;
import fr.trophyquest.backend.domain.entity.psn.PsnTrophy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PsnTrophyRepository extends JpaRepository<PsnTrophy, UUID> {

    @Query(value = """
            select new fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO(
                t.id,
                t.rank,
                t.title,
                t.description,
                t.trophyType,
                t.isHidden,
                t.icon,
                t.trophySuiteGroup.psnId,
                t.trophySuiteGroup.name,
                null
            )
            from PsnTrophy t
                left join t.trophySuiteGroup
            where t.trophySuite.id = :trophySuiteId
            order by t.rank asc
            """)
    List<EarnedTrophyDTO> fetchTrophiesOfTrophySuite(UUID trophySuiteId);

    @Query(value = """
            select new fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO(
               t.id,
               t.rank,
               t.title,
               t.description,
               t.trophyType,
               t.isHidden,
               t.icon,
               t.trophySuiteGroup.psnId,
               t.trophySuiteGroup.name,
               et.earnedAt
            )
            from PsnTrophy t
                left join t.earnedBy et on et.player.id = :playerId
                left join t.trophySuiteGroup
            where t.trophySuite.id = :trophySuiteId
            order by t.rank asc
            """)
    List<EarnedTrophyDTO> fetchPlayerTrophiesForTrophySuite(UUID trophySuiteId, UUID playerId);

    long countTrophyByAwsIconUrlIsNotNull();

    long countTrophyByAwsIconUrlIsNull();
}
