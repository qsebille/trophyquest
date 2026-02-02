package fr.trophyquest.backend.exceptions;

import java.util.UUID;

public class TrophySuiteNotFoundException extends RuntimeException {
    public TrophySuiteNotFoundException(UUID trophySuiteId) {
        super("TrophySuite with id" + trophySuiteId + " not found");
    }
}
