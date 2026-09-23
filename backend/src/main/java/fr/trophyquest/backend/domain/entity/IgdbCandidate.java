package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.embedded.IgdbCandidateId;
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
@Table(name = "igdb_candidate", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbCandidate {
    @EmbeddedId
    private IgdbCandidateId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("suiteId")
    @JoinColumn(name = "suite_id", nullable = false)
    private Suite suite;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("candidateId")
    @JoinColumn(name = "candidate_id", nullable = false)
    private IgdbGame game;

    private double score;

    private String status;
}
