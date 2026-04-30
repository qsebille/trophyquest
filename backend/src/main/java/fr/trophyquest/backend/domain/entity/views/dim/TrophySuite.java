package fr.trophyquest.backend.domain.entity.views.dim;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "v_dim_trophy_suite")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class TrophySuite {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "name")
    private String name;

    @Column(name = "platforms")
    private List<String> platforms;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "nb_platinum")
    private Integer nbPlatinumTrophies;

    @Column(name = "nb_gold")
    private Integer nbGoldTrophies;

    @Column(name = "nb_silver")
    private Integer nbSilverTrophies;

    @Column(name = "nb_bronze")
    private Integer nbBronzeTrophies;
}
