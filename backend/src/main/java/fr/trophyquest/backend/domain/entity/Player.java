package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

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

}