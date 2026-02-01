package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.embedded.EarnedTrophyId;
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
@Table(name = "psn_earned_trophy")
@Data
public class EarnedTrophy {

    @EmbeddedId
    private EarnedTrophyId id;

    private Instant earnedAt;

    @MapsId("playerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @MapsId("trophyId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trophy_id", nullable = false)
    private Trophy trophy;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EarnedTrophy that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
