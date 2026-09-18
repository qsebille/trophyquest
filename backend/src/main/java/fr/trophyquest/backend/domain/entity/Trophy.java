package fr.trophyquest.backend.domain.entity;

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
import org.hibernate.annotations.Immutable;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "trophy", schema = "app")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Trophy {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "suite_id", nullable = false)
    private Suite suite;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "color")
    private String color;

    @Column(name = "is_hidden")
    private Boolean isHidden;

    @Column(name = "group_name")
    private String groupName;

    @OneToMany(mappedBy = "trophy")
    private List<EarnedTrophy> earnedBy;
}
