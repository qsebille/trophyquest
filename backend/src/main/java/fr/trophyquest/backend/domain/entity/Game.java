package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "game", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Game {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "background_url")
    private String backgroundUrl;

    @Column(name = "summary")
    private String summary;

    @Column(name = "genres")
    private List<String> genres;

    @Column(name = "themes")
    private List<String> themes;

    @Column(name = "platforms")
    private List<String> platforms;

    @Column(name = "official_website")
    private String officialWebsite;

    @Column(name = "wikia_website")
    private String wikiaWebsite;

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "nb_suites")
    private Integer nbSuites;

    @Column(name = "nb_players")
    private Integer nbPlayers;

    @Column(name = "screenshot_urls")
    private List<String> screenshotsUrl;
}
