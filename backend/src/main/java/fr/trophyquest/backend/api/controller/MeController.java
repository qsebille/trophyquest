package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.auth.user.AuthUserDTO;
import fr.trophyquest.backend.service.AuthUserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeController {

    private final AuthUserService authUserService;

    public MeController(AuthUserService authUserService) {
        this.authUserService = authUserService;
    }

    @GetMapping("/api/me")
    public AuthUserDTO me(@AuthenticationPrincipal Jwt jwt) {
        return this.authUserService.fetchCurrentUser(jwt);
    }
}