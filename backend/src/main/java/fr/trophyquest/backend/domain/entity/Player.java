package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "psn_player")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Player {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String pseudo;

    @Formula("coalesce(aws_avatar_url, psn_avatar_url)")
    private String avatar;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayedGame> playedGames = new ArrayList<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayedTrophySuite> playedTrophySuites = new ArrayList<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayedEdition> playedEditions = new ArrayList<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EarnedTrophy> earnedTrophies = new ArrayList<>();

}