package fr.trophyquest.backend.domain.entity.igdb;

import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbGameCollectionId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "igdb_game_collection")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbGameCollection {

    @EmbeddedId
    private IgdbGameCollectionId id;

    @MapsId("gameId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private IgdbGame game;

    @MapsId("collectionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "collection_id", nullable = false)
    private IgdbCollection collection;

}