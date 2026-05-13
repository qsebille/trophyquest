package fr.trophyquest.backend.domain.entity.views.dim;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.UUID;

@Entity
@Table(name = "v_dim_player")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Player {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "pseudo")
    private String pseudo;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "nb_played_games")
    private Integer nbPlayedGames;

    @Column(name = "nb_earned_platinum")
    private Integer nbEarnedPlatinum;

    @Column(name = "nb_earned_gold")
    private Integer nbEarnedGold;

    @Column(name = "nb_earned_silver")
    private Integer nbEarnedSilver;

    @Column(name = "nb_earned_bronze")
    private Integer nbEarnedBronze;

    @Column(name = "nb_earned_trophies")
    private Integer nbEarnedTrophies;
}
