package fr.trophyquest.backend.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum IgdbGameImageType {
    COVER("cover");

    private final String value;
}
