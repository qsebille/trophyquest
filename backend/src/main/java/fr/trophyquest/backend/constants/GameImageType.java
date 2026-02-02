package fr.trophyquest.backend.constants;

import lombok.Getter;

@Getter
public enum GameImageType {
    MASTER("MASTER");

    private final String value;

    GameImageType(String value) {
        this.value = value;
    }
}
