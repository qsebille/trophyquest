package fr.trophyquest.backend.domain.entity.igdb;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "igdb_game")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbGame {

    @Id
    @EqualsAndHashCode.Include
    private Long id;

    private String name;

    private String summary;

    private String gameType;

    private Date releaseDate;

    private List<String> genres;

    private List<String> themes;

    private List<String> screenshots;

    private String cover;

    private String artworkWithLogo;

    private String artworkWithoutLogo;

    private String psnWebsite;

    private String officialWebsite;

    private String communityWikiWebsite;

    private List<String> youtubeIds;

    @Formula("coalesce(psn_website, official_website, community_wiki_website)")
    private String website;

    @ManyToMany
    @JoinTable(
            name = "igdb_game_collection",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id")
    )
    private Set<IgdbCollection> collections = new HashSet<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<IgdbGameCompany> companies = new HashSet<>();

}