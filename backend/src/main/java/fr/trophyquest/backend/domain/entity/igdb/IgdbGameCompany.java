package fr.trophyquest.backend.domain.entity.igdb;

import fr.trophyquest.backend.domain.entity.igdb.embedded.IgdbGameCompanyId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "igdb_game_company")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IgdbGameCompany {

    @EmbeddedId
    private IgdbGameCompanyId id;

    private String role;

    @MapsId("gameId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private IgdbGame game;

    @MapsId("companyId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private IgdbCompany company;

}