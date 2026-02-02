package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class PlayedEditionId implements java.io.Serializable {

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "edition_id")
    private UUID editionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayedEditionId that)) return false;
        return Objects.equals(playerId, that.playerId) && Objects.equals(editionId, that.editionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, editionId);
    }
    
}