package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.domain.entity.GameImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameImageRepository extends JpaRepository<GameImage, UUID> {

    @Query(value = """
            select new fr.trophyquest.backend.api.dto.game.GameCoverImageDTO(i.id, i.url)
            from GameImage i
            where i.type = 'GAMEHUB_COVER_ART' and i.game.id = :gameId
            order by random()
            limit 1""")
    GameCoverImageDTO fetchGameCoverImage(@Param("gameId") UUID gameId);

    long countGameImageByAwsUrlIsNull();

    long countGameImageByAwsUrlIsNotNull();
}
