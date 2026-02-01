package fr.trophyquest.backend.domain.entity.igdb.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class IgdbCandidateId implements java.io.Serializable {

    @Column(name = "psn_game_id")
    private UUID psnGameId;

    @Column(name = "igdb_game_id")
    private Long candidateId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IgdbCandidateId that)) return false;
        return Objects.equals(psnGameId, that.psnGameId) && Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(psnGameId, candidateId);
    }
}