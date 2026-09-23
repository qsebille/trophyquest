package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.List;
import java.util.UUID;

@Entity
@Table(schema = "app", name = "player")
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

    @Column(name = "nb_played_suites")
    private Integer nbPlayedSuites;

    @Column(name = "nb_earned_platinum_trophies")
    private Integer nbEarnedPlatinum;

    @Column(name = "nb_earned_gold_trophies")
    private Integer nbEarnedGold;

    @Column(name = "nb_earned_silver_trophies")
    private Integer nbEarnedSilver;

    @Column(name = "nb_earned_bronze_trophies")
    private Integer nbEarnedBronze;

    @Column(name = "nb_earned_trophies")
    private Integer nbEarnedTrophies;

    @Column(name = "nb_recent_trophies")
    private Integer nbRecentTrophies;

    @OneToMany(mappedBy = "player")
    private List<EarnedTrophy> earnedTrophies;
}
