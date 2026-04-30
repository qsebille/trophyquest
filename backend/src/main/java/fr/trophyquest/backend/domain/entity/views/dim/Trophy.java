package fr.trophyquest.backend.domain.entity.views.dim;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Immutable;

import java.util.UUID;

@Entity
@Table(name = "v_dim_trophy")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Immutable
public class Trophy {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private UUID id;

    @Column(name = "trophy_suite_id")
    private UUID trophySuiteId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "trophy_type")
    private String trophyType;

    @Column(name = "is_hidden")
    private Boolean isHidden;

    @Column(name = "group_type")
    private String groupType;

    @Column(name = "group_name")
    private String groupName;
}
