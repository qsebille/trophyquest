package fr.trophyquest.backend.domain.repository.views.dim;

import fr.trophyquest.backend.domain.entity.views.dim.Trophy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TrophyRepository extends JpaRepository<Trophy, UUID> {
    List<Trophy> findAllByTrophySuiteId(UUID gameId);
}
