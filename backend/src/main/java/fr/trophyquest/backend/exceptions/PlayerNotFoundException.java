package fr.trophyquest.backend.exceptions;

import java.util.UUID;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException(UUID playerId) {
        super("Player with id" + playerId + " not found");
    }
}
