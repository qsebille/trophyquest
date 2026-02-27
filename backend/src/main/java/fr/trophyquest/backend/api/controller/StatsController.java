package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.stats.ImageUploadStats;
import fr.trophyquest.backend.service.ImageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    private final ImageService imageService;

    public StatsController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/image-upload/psn")
    public ImageUploadStats getPsnImageUploadStats() {
        return this.imageService.getPsnImageUploadStats();
    }

    @GetMapping("/image-upload/igdb")
    public ImageUploadStats getIgdbImageUploadStats() {
        return this.imageService.getIgdbImageUploadStats();
    }
}
