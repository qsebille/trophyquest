package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class PlayedTrophySuiteId implements java.io.Serializable {

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayedTrophySuiteId that)) return false;
        return Objects.equals(playerId, that.playerId) && Objects.equals(trophySuiteId, that.trophySuiteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, trophySuiteId);
    }
}