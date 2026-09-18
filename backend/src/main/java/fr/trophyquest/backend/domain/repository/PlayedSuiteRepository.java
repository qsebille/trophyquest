package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.PlayedSuite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayedSuiteRepository extends JpaRepository<PlayedSuite, UUID> {
    Page<PlayedSuite> findBySuiteId(UUID suiteId, Pageable pageable);

    @EntityGraph(attributePaths = {"suite"})
    Page<PlayedSuite> findAllByPlayerId(UUID playerId, Pageable pageable);
}
