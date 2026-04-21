package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.domain.entity.PsnGameImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameImageRepository extends JpaRepository<PsnGameImage, UUID> {

    @Query(value = """
            SELECT new fr.trophyquest.backend.api.dto.game.GameCoverImageDTO(i.id, i.url)
            FROM PsnGameImage i
            WHERE i.type = 'GAMEHUB_COVER_ART' and i.psnGame.id = :gameId
            ORDER BY random()
            LIMIT 1""")
    GameCoverImageDTO fetchGameCoverImage(@Param("gameId") UUID gameId);

    long countGameImageByAwsUrlIsNull();

    long countGameImageByAwsUrlIsNotNull();
}
