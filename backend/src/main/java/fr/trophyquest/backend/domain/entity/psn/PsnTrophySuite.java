package fr.trophyquest.backend.domain.entity.psn;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "psn_suite")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PsnTrophySuite {

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "title")
    private String name;

    @Column(name = "platforms")
    private List<String> platforms;

    @Formula("coalesce(aws_image_url, psn_image_url)")
    private String image;

    @Column(name = "aws_image_url")
    private String awsImageUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private PsnGame game;

    @OneToMany(mappedBy = "trophySuite")
    private Set<PsnTrophy> trophies = new HashSet<>();

}