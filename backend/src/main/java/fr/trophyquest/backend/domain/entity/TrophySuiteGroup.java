package fr.trophyquest.backend.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Entity
@Table(name = "psn_trophy_suite_group")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TrophySuiteGroup {

    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String psnId;

    private String name;

}