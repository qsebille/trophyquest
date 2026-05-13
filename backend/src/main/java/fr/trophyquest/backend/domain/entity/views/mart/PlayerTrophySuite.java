package fr.trophyquest.backend.domain.entity.views.mart;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "v_mart_player_trophy_suite")
@Data
@Immutable
public class PlayerTrophySuite {
    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "name")
    private String name;

    @Column(name = "platforms")
    private List<String> platforms;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "game_background_image_url")
    private String gameBackgroundImageUrl;

    @Column(name = "nb_platinum")
    private Integer nbPlatinum;

    @Column(name = "nb_gold")
    private Integer nbGold;

    @Column(name = "nb_silver")
    private Integer nbSilver;

    @Column(name = "nb_bronze")
    private Integer nbBronze;

    @Column(name = "nb_earned_platinum")
    private Integer nbEarnedPlatinum;

    @Column(name = "nb_earned_gold")
    private Integer nbEarnedGold;

    @Column(name = "nb_earned_silver")
    private Integer nbEarnedSilver;

    @Column(name = "nb_earned_bronze")
    private Integer nbEarnedBronze;

    @Column(name = "last_played_at")
    private Date lastPlayedAt;
}
