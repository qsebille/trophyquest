package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.views.RecentGameSearchItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecentGameSearchItemRepository extends JpaRepository<RecentGameSearchItem, UUID> {

    @Query("select r from RecentGameSearchItem r order by r.nbPlayers desc, r.lastPlayedAt desc limit 1")
    RecentGameSearchItem findTop();

}
