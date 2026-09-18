package fr.trophyquest.backend.domain.entity.igdb;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "igdb_game")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class OldIgdbGame {

    @Id
    @EqualsAndHashCode.Include
    private Long id;

    private String name;

    private String summary;

    private String gameType;

    private Date releaseDate;

    private List<String> genres;

    private List<String> themes;

    private String psnWebsite;

    private String officialWebsite;

    private String communityWikiWebsite;

    private List<String> youtubeIds;

    @Formula("coalesce(psn_website, official_website, community_wiki_website)")
    private String website;

}