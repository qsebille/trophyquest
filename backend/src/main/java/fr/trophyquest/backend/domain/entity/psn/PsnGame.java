package fr.trophyquest.backend.domain.entity.psn;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @Column(name = "title")
    private String name;

    @Column(name = "igdb_match_status")
    private String igdbMatchStatus;

    @OneToMany(mappedBy = "psnGame")
    private Set<PsnGameImage> images = new HashSet<>();
}