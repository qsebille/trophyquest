package fr.trophyquest.backend.domain.repository.views.fact;

import fr.trophyquest.backend.domain.entity.views.fact.EarnedTrophy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EarnedTrophyRepository extends JpaRepository<EarnedTrophy, UUID> {
    List<EarnedTrophy> findAllByPlayerIdAndTrophySuiteId(UUID playerId, UUID trophySuiteId);
}
