package fr.trophyquest.backend.domain.repository.views.dim;

import fr.trophyquest.backend.domain.entity.views.dim.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayerRepository extends JpaRepository<Player, UUID> {
}
