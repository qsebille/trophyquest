package fr.trophyquest.backend.domain.entity.psn.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class PsnPlayedEditionId implements java.io.Serializable {

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "edition_id")
    private UUID editionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PsnPlayedEditionId that)) return false;
        return Objects.equals(playerId, that.playerId) && Objects.equals(editionId, that.editionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, editionId);
    }

}