package fr.trophyquest.backend.domain.entity.psn;

import fr.trophyquest.backend.domain.entity.psn.embedded.PsnPlayedGameId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "psn_played_game")
@Data
public class PsnPlayedGame {

    @EmbeddedId
    private PsnPlayedGameId id;

    @MapsId("playerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private PsnPlayer player;

    @MapsId("gameId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private PsnGame game;

    private Instant firstPlayedAt;

    private Instant lastPlayedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PsnPlayedGame that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
