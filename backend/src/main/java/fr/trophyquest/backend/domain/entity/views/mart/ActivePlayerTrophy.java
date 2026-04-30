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
@Table(name = "v_mart_active_player_trophy")
@Data
@Immutable
public class ActivePlayerTrophy {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "trophy_id")
    private UUID trophyId;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "player_pseudo")
    private String playerPseudo;

    @Column(name = "player_avatar_url")
    private String playerAvatarUrl;

    @Column(name = "trophy_title")
    private String trophyTitle;

    @Column(name = "trophy_type")
    private String trophyType;

    @Column(name = "trophy_icon_url")
    private String trophyIconUrl;

    @Column(name = "trophy_earned_at")
    private Date earnedAt;

    @Column(name = "player_trophy_count")
    private Integer playerTrophyCount;
}
