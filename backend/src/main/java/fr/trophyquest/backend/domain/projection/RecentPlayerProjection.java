package fr.trophyquest.backend.domain.projection;

import java.util.UUID;

public interface RecentPlayerProjection {
    UUID getPlayerId();

    String getPseudo();

    String getAvatarUrl();

    int getNbRecentBronzeTrophies();

    int getNbRecentSilverTrophies();

    int getNbRecentGoldTrophies();

    int getNbRecentPlatinumTrophies();
}