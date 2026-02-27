package fr.trophyquest.backend.domain.entity.igdb;

import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbImageId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "igdb_image")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbImage {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private IgdbImageId id;

    @Formula("coalesce(aws_url, igdb_url)")
    private String imageUrl;

    private String awsUrl;

    private String imageType;

    @MapsId("igdbGameId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "igdb_game_id", nullable = false)
    private IgdbGame game;

}