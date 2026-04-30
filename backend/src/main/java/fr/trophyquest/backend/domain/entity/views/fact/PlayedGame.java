package fr.trophyquest.backend.domain.entity.views.fact;


import fr.trophyquest.backend.domain.entity.views.dim.Game;
import fr.trophyquest.backend.domain.entity.views.dim.Player;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "v_fact_played_game")
@Data
@Immutable
public class PlayedGame {
    @Id
    @Column(name = "id")
    private UUID id;

    @MapsId("id")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;


    @MapsId("id")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "last_played_at")
    private Date lastPlayedAt;
}
