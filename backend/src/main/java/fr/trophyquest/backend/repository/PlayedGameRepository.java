package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.PlayedGame;
import fr.trophyquest.backend.domain.entity.embedded.PlayedGameId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlayedGameRepository extends JpaRepository<PlayedGame, PlayedGameId> {
    Page<PlayedGame> findAllByIdGameId(UUID gameId, Pageable pageable);
}
