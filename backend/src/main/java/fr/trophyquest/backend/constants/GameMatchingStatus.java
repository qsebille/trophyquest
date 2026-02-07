package fr.trophyquest.backend.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GameMatchingStatus {
    PENDING("PENDING"),
    VALIDATION_REQUIRED("VALIDATION_REQUIRED"),
    NO_FOUND_CANDIDATE("NO_FOUND_CANDIDATE"),
    ALL_REFUSED("ALL_REFUSED"),
    MATCHED("MATCHED");

    private final String value;
}
