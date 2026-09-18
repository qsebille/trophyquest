package fr.trophyquest.backend.api.exception;

import java.util.UUID;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException(UUID playerId) {
        super("Player not found with id: " + playerId);
    }
}
