package fr.trophyquest.backend.domain.entity.igdb;

import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbCandidateId;
import fr.trophyquest.backend.domain.entity.psn.PsnGame;
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
@Table(name = "igdb_candidate")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbCandidate {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private IgdbCandidateId id;

    private Long score;

    private String status;

    @MapsId("psnGameId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "psn_game_id", nullable = false)
    private PsnGame psnGame;

    @MapsId("candidateId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "igdb_game_id", nullable = false)
    private IgdbGame candidate;

}