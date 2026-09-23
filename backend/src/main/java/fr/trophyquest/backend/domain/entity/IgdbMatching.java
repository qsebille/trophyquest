package fr.trophyquest.backend.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Entity
@Table(schema = "app", name = "igdb_matching")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbMatching {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "suite_id")
    private UUID suiteId;

    @Column(name = "matched_game_id")
    private Long matchedGameId;

    @Column(name = "status")
    private String status;
}
