package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "suite", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Suite {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "name")
    private String name;

    @Column(name = "platforms")
    private List<String> platforms;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "nb_platinum_trophies")
    private Integer nbPlatinumTrophies;

    @Column(name = "nb_gold_trophies")
    private Integer nbGoldTrophies;

    @Column(name = "nb_silver_trophies")
    private Integer nbSilverTrophies;

    @Column(name = "nb_bronze_trophies")
    private Integer nbBronzeTrophies;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_player_id", referencedColumnName = "id")
    private Player lastPlayer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "suite_id", unique = true)
    private IgdbMatching matching;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "suite")
    private List<IgdbCandidate> candidates;

}
