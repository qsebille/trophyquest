package fr.trophyquest.backend.domain.projection;

public interface RecentGameProjection {
    Long getGameId();

    String getTitle();

    String getCoverUrl();

    String getBackgroundUrl();

    Integer getNbRecentPlayers();
}