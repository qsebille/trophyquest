package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.embedded.PlayedTrophySuiteId;
import fr.trophyquest.backend.domain.entity.views.PlayedTrophySuiteSearchItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayedTrophySuiteSearchItemRepository extends JpaRepository<PlayedTrophySuiteSearchItem, PlayedTrophySuiteId> {

    Page<PlayedTrophySuiteSearchItem> findAllByIdPlayerId(UUID playerId, Pageable pageable);

}
