package fr.trophyquest.backend.domain.entity.igdb;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "igdb_company")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbCompany {

    @Id
    @EqualsAndHashCode.Include
    private Long id;

    private String name;

    @OneToMany(mappedBy = "company")
    private Set<IgdbGameCompany> games = new HashSet<>();

}