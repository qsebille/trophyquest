package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.embedded.EarnedTrophyId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.time.Instant;

@Entity
@Table(name = "earned_trophy", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class EarnedTrophy {
    @EmbeddedId
    private EarnedTrophyId id;

    @MapsId("playerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @MapsId("trophyId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trophy_id", nullable = false)
    private Trophy trophy;

    @Column(name = "earned_at")
    private Instant earnedAt;
}
