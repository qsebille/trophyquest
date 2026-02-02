package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.service.TrophyService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trophy")
@CrossOrigin(origins = "*")
public class TrophyController {

    private final TrophyService trophyService;

    public TrophyController(TrophyService trophyService) {
        this.trophyService = trophyService;
    }

    @GetMapping("/count")
    public long count() {
        return this.trophyService.count();
    }

    @GetMapping("/earned/recent/count")
    public long countEarnedDistinct() {
        return this.trophyService.countRecentlyEarned();
    }

}
