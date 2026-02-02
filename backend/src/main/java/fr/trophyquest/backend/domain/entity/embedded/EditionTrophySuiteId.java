package fr.trophyquest.backend.domain.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
public class EditionTrophySuiteId implements java.io.Serializable {

    @Column(name = "edition_id")
    private UUID editionId;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EditionTrophySuiteId that)) return false;
        return Objects.equals(editionId, that.editionId) && Objects.equals(trophySuiteId, that.trophySuiteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(editionId, trophySuiteId);
    }
}