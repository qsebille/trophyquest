package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class PlayedGameId implements java.io.Serializable {

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "game_id")
    private UUID gameId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayedGameId that)) return false;
        return Objects.equals(playerId, that.playerId) && Objects.equals(gameId, that.gameId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, gameId);
    }

}