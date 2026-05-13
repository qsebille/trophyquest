package fr.trophyquest.backend.domain.entity.views.mart;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "v_mart_recent_game")
@Data
@Immutable
public class RecentGame {
    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "master_image_url")
    private String masterImageUrl;

    @Column(name = "background_image_url")
    private String backgroundImageUrl;

    @Column(name = "nb_players")
    private Integer nbPlayers;

    @Column(name = "last_played_at")
    private Date lastPlayedAt;
}
