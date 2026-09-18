package fr.trophyquest.backend.domain.repository.igdb;

import fr.trophyquest.backend.domain.entity.igdb.OldIgdbGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IgdbGameRepository extends JpaRepository<OldIgdbGame, Long> {
}
