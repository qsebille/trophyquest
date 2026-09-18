package fr.trophyquest.backend.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "played_suite", schema = "app")
@Data
@Immutable
public class PlayedSuite {
    @Id
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "suite_id")
    private Suite suite;

    @ManyToOne()
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "nb_earned_platinum")
    private Integer nbEarnedPlatinum;

    @Column(name = "nb_earned_gold")
    private Integer nbEarnedGold;

    @Column(name = "nb_earned_silver")
    private Integer nbEarnedSilver;

    @Column(name = "nb_earned_bronze")
    private Integer nbEarnedBronze;

    @Column(name = "last_played_at")
    private Instant lastPlayedAt;
}
