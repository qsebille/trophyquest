package fr.trophyquest.backend.domain.repository.views.dim;

import fr.trophyquest.backend.domain.entity.views.dim.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {
    Optional<Game> findFirstById(UUID gameId);

    Page<Game> findGamesByNameContainsIgnoreCase(String name, Pageable pageable);
}
