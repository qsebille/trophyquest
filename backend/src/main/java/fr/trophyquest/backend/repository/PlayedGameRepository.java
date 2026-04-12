package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.api.dto.player.GamePlayerDTO;
import fr.trophyquest.backend.domain.entity.PlayedGame;
import fr.trophyquest.backend.domain.entity.embedded.PlayedGameId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PlayedGameRepository extends JpaRepository<PlayedGame, PlayedGameId> {


    @Query("""
                SELECT new fr.trophyquest.backend.api.dto.player.GamePlayerDTO(
                    pg.player.id,
                    pg.player.pseudo,
                    pg.player.avatar,
                    pg.lastPlayedAt
                )
                FROM PlayedGame pg
                WHERE pg.id.gameId = :gameId
                ORDER BY pg.lastPlayedAt DESC
            """)
    List<GamePlayerDTO> fetchRecentPlayersForGame(UUID gameId, Pageable pageable);

    long countByIdGameId(UUID gameId);

}
