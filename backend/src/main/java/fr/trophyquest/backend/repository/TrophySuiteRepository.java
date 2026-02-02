package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.TrophySuite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TrophySuiteRepository extends JpaRepository<TrophySuite, UUID> {
}
