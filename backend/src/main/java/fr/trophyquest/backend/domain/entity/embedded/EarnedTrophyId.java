package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class EarnedTrophyId implements java.io.Serializable {

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "trophy_id")
    private UUID trophyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EarnedTrophyId that)) return false;
        return Objects.equals(playerId, that.playerId) && Objects.equals(trophyId, that.trophyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, trophyId);
    }
}