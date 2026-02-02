package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.IntegrationTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PlayerControllerIT extends IntegrationTestBase {

    private static final String BASE_PATH = "/api/player";

    @Autowired
    MockMvc mockMvc;

    @Test
    void should_count_players() throws Exception {
        runScript("/sql/clean-db.sql");
        runScript("/sql/players/insert-players.sql");

        mockMvc.perform(get(BASE_PATH + "/count"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(2))
        ;
    }
}

