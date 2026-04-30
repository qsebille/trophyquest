package fr.trophyquest.backend.domain.entity.views.fact;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "v_fact_earned_trophy")
@Data
@Immutable
public class EarnedTrophy {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "trophy_id")
    private UUID trophyId;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Column(name = "earned_at")
    private Date earnedAt;
}
