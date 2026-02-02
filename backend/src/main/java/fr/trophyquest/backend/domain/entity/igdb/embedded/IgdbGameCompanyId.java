package fr.trophyquest.backend.domain.entity.igdb.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;

@Embeddable
@Data
public class IgdbGameCompanyId implements java.io.Serializable {

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "company_id")
    private Long companyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IgdbGameCompanyId that)) return false;
        return Objects.equals(gameId, that.gameId) && Objects.equals(companyId, that.companyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameId, companyId);
    }
}