package fr.trophyquest.backend.domain.projection;

import java.time.Instant;
import java.util.UUID;

public interface RecentPlayerRow {
    UUID getPlayerId();

    String getPseudo();

    String getAvatar();

    long getRecentTrophyCount();

    UUID getTrophyId();

    String getTrophyTitle();

    String getTrophyType();

    String getTrophyIcon();

    String getTrophyDescription();

    UUID getTrophySuiteId();

    String getTrophySuiteTitle();

    Instant getEarnedAt();
}
