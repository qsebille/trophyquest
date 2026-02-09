package fr.trophyquest.backend.domain.entity.igdb.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;

@Embeddable
@Data
public class IgdbImageId implements java.io.Serializable {

    @Column(name = "igdb_game_id")
    private Long igdbGameId;

    @Column(name = "igdb_url")
    private String igdbUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IgdbImageId that)) return false;
        return Objects.equals(igdbGameId, that.igdbGameId) && Objects.equals(igdbUrl, that.igdbUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(igdbGameId, igdbUrl);
    }
}