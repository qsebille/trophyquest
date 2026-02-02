package fr.trophyquest.backend.domain.entity.views;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.UUID;

@Entity
@Table(name = "v_player_search_item")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class PlayerSearchItem {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String pseudo;

    private String avatar;

    private Long totalPlayedGames;
    
    private Long totalEarnedTrophies;

    private Long totalEarnedPlatinum;

    private Long totalEarnedGold;

    private Long totalEarnedSilver;

    private Long totalEarnedBronze;

}