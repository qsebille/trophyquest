package fr.trophyquest.backend.domain.entity.psn;

import fr.trophyquest.backend.domain.entity.psn.embedded.PsnEditionTrophySuiteId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "psn_edition_trophy_suite")
@Data
public class PsnEditionTrophySuite {

    @EmbeddedId
    private PsnEditionTrophySuiteId id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PsnEditionTrophySuite that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @MapsId("editionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "edition_id", nullable = false)
    private PsnEdition edition;

    @MapsId("trophySuiteId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trophy_suite_id", nullable = false)
    private PsnTrophySuite trophySuite;
}