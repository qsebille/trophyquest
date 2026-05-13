package fr.trophyquest.backend.domain.repository.views.mart;

import fr.trophyquest.backend.domain.entity.views.mart.RecentGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecentGameRepository extends JpaRepository<RecentGame, UUID> {
    @Query("SELECT r FROM RecentGame r WHERE r.nbPlayers > 0")
    Page<RecentGame> findAllPlayed(Pageable pageable);
}
