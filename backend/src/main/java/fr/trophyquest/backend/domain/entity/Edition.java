package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.util.UUID;

@Entity
@Table(name = "psn_edition")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Edition {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;

    @Formula("coalesce(aws_image_url, psn_image_url)")
    private String image;

    private String category;

    private String service;

}