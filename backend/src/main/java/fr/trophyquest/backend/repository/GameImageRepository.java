package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.GameImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameImageRepository extends JpaRepository<GameImage, UUID> {
}
