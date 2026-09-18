package fr.trophyquest.backend.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.UUID;

@Entity
@Table(name = "igdb_matching", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class IgdbMatching {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "suite_id")
    private UUID suite_id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "matched_game_id", nullable = false)
    private Game game;

    @Column(name = "status")
    private String status;
}
