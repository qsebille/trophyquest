package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.views.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {
    Page<Game> findGamesByNameContainsIgnoreCase(String name, Pageable pageable);
}
