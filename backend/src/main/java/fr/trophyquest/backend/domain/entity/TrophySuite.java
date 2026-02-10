package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "psn_trophy_suite")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TrophySuite {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;

    private String version;

    private List<String> platforms;

    @Formula("coalesce(aws_image_url, psn_image_url)")
    private String image;

}