package fr.trophyquest.backend.domain.entity.views;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "v_recent_game_search_item")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class RecentGameSearchItem {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;

    private String imageUrl;

    private Integer nbPlayers;

    private Instant lastPlayedAt;

}