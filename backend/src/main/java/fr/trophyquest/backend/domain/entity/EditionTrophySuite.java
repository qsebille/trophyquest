package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.embedded.EditionTrophySuiteId;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "psn_edition_trophy_suite")
@Data
public class EditionTrophySuite {

    @EmbeddedId
    private EditionTrophySuiteId id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EditionTrophySuite that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @MapsId("editionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "edition_id", nullable = false)
    private Edition edition;

    @MapsId("trophySuiteId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trophy_suite_id", nullable = false)
    private TrophySuite trophySuite;
}