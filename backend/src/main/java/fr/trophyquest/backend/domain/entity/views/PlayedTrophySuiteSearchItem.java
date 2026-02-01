package fr.trophyquest.backend.domain.entity.views;

import fr.trophyquest.backend.domain.entity.embedded.PlayedTrophySuiteId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "v_played_trophy_suite_search_item")
@Data
@Immutable
public class PlayedTrophySuiteSearchItem {

    @EmbeddedId
    private PlayedTrophySuiteId id;

    private String trophySuiteName;

    private List<String> trophySuitePlatforms;

    private String imageUrl;

    private Long totalTrophies;

    private Long totalEarnedPlatinum;

    private Long totalEarnedGold;

    private Long totalEarnedSilver;

    private Long totalEarnedBronze;

    private Instant lastPlayedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayedTrophySuiteSearchItem that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}