package fr.trophyquest.backend.repository.psn;

import fr.trophyquest.backend.domain.entity.psn.PsnPlayedGame;
import fr.trophyquest.backend.domain.entity.psn.embedded.PsnPlayedGameId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PsnPlayedGameRepository extends JpaRepository<PsnPlayedGame, PsnPlayedGameId> {
    Page<PsnPlayedGame> findAllByIdGameId(UUID gameId, Pageable pageable);
}
