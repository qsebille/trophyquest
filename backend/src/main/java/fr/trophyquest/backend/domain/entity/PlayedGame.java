package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.embedded.PlayedGameId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "psn_played_game")
@Data
public class PlayedGame {

    @EmbeddedId
    private PlayedGameId id;

    private Instant firstPlayedAt;
    
    private Instant lastPlayedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayedGame that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
