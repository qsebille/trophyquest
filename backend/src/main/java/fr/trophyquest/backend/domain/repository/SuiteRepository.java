package fr.trophyquest.backend.domain.repository;

import fr.trophyquest.backend.domain.entity.Suite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SuiteRepository extends JpaRepository<Suite, UUID> {
    Optional<Suite> findFirstById(UUID suiteId);

    List<Suite> findAllByGameId(long gameId);

    @EntityGraph(attributePaths = {"candidates", "matching", "lastPlayer"})
    Page<Suite> findByMatchingStatus(String status, Pageable pageable);
}
