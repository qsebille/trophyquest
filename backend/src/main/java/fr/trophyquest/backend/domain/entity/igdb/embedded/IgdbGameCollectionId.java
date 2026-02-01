package fr.trophyquest.backend.domain.entity.igdb.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;

@Embeddable
@Data
public class IgdbGameCollectionId implements java.io.Serializable {

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "collection_id")
    private Long collectionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IgdbGameCollectionId that)) return false;
        return Objects.equals(gameId, that.gameId) && Objects.equals(collectionId, that.collectionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameId, collectionId);
    }
}