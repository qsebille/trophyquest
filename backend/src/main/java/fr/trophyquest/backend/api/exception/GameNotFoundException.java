package fr.trophyquest.backend.api.exception;

import java.util.UUID;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(Long gameId) {
        super("Game not found by game id: " + gameId);
    }

    public GameNotFoundException(UUID suiteId) {
        super("Game not found by suite id: " + suiteId);
    }
}
