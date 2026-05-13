package fr.trophyquest.backend.domain.repository.views.mart;

import fr.trophyquest.backend.domain.entity.views.mart.PlayerTrophy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayerTrophyRepository extends JpaRepository<PlayerTrophy, UUID> {
    Page<PlayerTrophy> findAllByPlayerId(UUID playerId, Pageable pageable);
}
