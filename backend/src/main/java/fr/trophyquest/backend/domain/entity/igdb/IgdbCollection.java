package fr.trophyquest.backend.domain.entity.igdb;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "igdb_collection")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbCollection {

    @Id
    @EqualsAndHashCode.Include
    private Long id;

    private String name;

}