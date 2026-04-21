package fr.trophyquest.backend.domain.entity.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "v_game")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Game {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "igdb_id")
    private Long igdbId;

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

    @Column(name = "nb_players")
    private Integer nbPlayers;

    @Column(name = "nb_trophy_suites")
    private Integer nbTrophySuites;
}
