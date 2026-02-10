package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.igdb.IgdbImage;
import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbImageId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IgdbImageRepository extends JpaRepository<IgdbImage, IgdbImageId> {
}
