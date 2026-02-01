package fr.trophyquest.backend.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "psn_trophy")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Trophy {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private int rank;

    private String title;

    private String description;

    private String trophyType;

    private boolean isHidden;

    @Formula("coalesce(aws_icon_url, psn_icon_url)")
    private String icon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trophy_suite_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TrophySuite trophySuite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trophy_suite_group_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TrophySuiteGroup trophySuiteGroup;

    @OneToMany(mappedBy = "trophy")
    private Set<EarnedTrophy> earnedBy = new HashSet<>();

}