package fr.trophyquest.backend.api.exception;

import java.util.UUID;

public class TrophySuiteNotFoundException extends RuntimeException {
    public TrophySuiteNotFoundException(UUID trophySuiteId) {
        super("Trophy suite not found with id: " + trophySuiteId);
    }
}
