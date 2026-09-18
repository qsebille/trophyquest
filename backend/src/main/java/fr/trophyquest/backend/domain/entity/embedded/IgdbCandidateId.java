package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class IgdbCandidateId implements java.io.Serializable {

    @Column(name = "suite_id")
    private UUID suiteId;

    @Column(name = "candidate_id")
    private long candidateId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IgdbCandidateId that)) return false;
        return Objects.equals(suiteId, that.suiteId) && Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(suiteId, candidateId);
    }
}