package fr.trophyquest.backend.domain.repository.views.fact;

import fr.trophyquest.backend.domain.entity.views.fact.PlayedGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayedGameRepository extends JpaRepository<PlayedGame, UUID> {
    Page<PlayedGame> findAllByGameId(UUID gameId, Pageable pageable);
}
