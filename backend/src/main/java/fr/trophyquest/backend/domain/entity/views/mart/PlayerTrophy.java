package fr.trophyquest.backend.domain.entity.views.mart;

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
@Table(name = "v_mart_player_trophy")
@Data
@Immutable
public class PlayerTrophy {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "title")
    private String title;

    @Column(name = "trophy_type")
    private String trophyType;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "trophy_suite_name")
    private String trophySuiteName;

    @Column(name = "earned_at")
    private Date earnedAt;
}
