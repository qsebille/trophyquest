package fr.trophyquest.backend.domain.entity.views.dim;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "v_dim_game")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Game {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "master_image_url")
    private String masterImageUrl;

    @Column(name = "background_image_url")
    private String backgroundImageUrl;

    @Column(name = "summary")
    private String summary;

    @Column(name = "genres")
    private List<String> genres;

    @Column(name = "themes")
    private List<String> themes;

    @Column(name = "platforms")
    private List<String> platforms;

    @Column(name = "website")
    private String website;

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "nb_trophy_suites")
    private Integer nbTrophySuites;

    @Column(name = "nb_players")
    private Integer nbPlayers;

    @Column(name = "screenshots_url")
    private List<String> screenshotsUrl;
}
