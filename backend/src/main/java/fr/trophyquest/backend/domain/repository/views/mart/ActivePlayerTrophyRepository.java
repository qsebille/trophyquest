package fr.trophyquest.backend.domain.repository.views.mart;

import fr.trophyquest.backend.domain.entity.views.mart.ActivePlayerTrophy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ActivePlayerTrophyRepository extends JpaRepository<ActivePlayerTrophy, UUID> {
}
