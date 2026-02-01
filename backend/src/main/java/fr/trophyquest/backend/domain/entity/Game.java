package fr.trophyquest.backend.domain.entity;

import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
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
public class Game {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "game")
    private Set<IgdbCandidate> igdbCandidates = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "igdb_game_id", referencedColumnName = "id", unique = true)
    private IgdbGame igdbGame;

    @OneToMany(mappedBy = "game")
    private Set<GameImage> images = new HashSet<>();

}