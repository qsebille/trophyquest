package fr.trophyquest.backend.domain.entity.psn;

import fr.trophyquest.backend.domain.entity.psn.embedded.PsnPlayedTrophySuiteId;
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
@Table(name = "psn_played_trophy_suite")
@Data
public class PsnPlayedTrophySuite {

    @EmbeddedId
    private PsnPlayedTrophySuiteId id;

    @MapsId("playerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private PsnPlayer player;

    @MapsId("trophySuiteId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trophy_suite_id", nullable = false)
    private PsnTrophySuite trophySuite;

    private Instant lastPlayedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PsnPlayedTrophySuite that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
