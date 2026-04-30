package fr.trophyquest.backend.domain.repository.psn;

import fr.trophyquest.backend.domain.entity.psn.PsnPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PsnPlayerRepository extends JpaRepository<PsnPlayer, UUID> {
    Optional<PsnPlayer> findByPseudo(String pseudo);
}
