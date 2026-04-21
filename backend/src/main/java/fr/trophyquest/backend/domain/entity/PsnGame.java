package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "psn_game")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PsnGame {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "igdb_match_status")
    private String igdbMatchStatus;

    @OneToMany(mappedBy = "psnGame")
    private Set<IgdbCandidate> igdbCandidates = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "igdb_game_id", referencedColumnName = "id", unique = true)
    private IgdbGame igdbGame;

    @OneToMany(mappedBy = "psnGame")
    private Set<PsnGameImage> images = new HashSet<>();
}