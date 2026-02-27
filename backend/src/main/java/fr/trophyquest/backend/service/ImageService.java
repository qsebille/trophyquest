package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.stats.ImageUploadStats;
import fr.trophyquest.backend.repository.GameImageRepository;
import fr.trophyquest.backend.repository.IgdbImageRepository;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final GameImageRepository gameImageRepository;
    private final IgdbImageRepository igdbImageRepository;


    public ImageService(GameImageRepository gameImageRepository, IgdbImageRepository igdbImageRepository) {
        this.gameImageRepository = gameImageRepository;
        this.igdbImageRepository = igdbImageRepository;
    }

    public ImageUploadStats getPsnImageUploadStats() {
        long uploaded = this.gameImageRepository.countGameImageByAwsUrlIsNotNull();
        long pending = this.gameImageRepository.countGameImageByAwsUrlIsNull();

        return ImageUploadStats.builder()
                .uploaded(uploaded)
                .pending(pending)
                .build();
    }

    public ImageUploadStats getIgdbImageUploadStats() {
        long uploaded = this.igdbImageRepository.countIgdbImageByAwsUrlIsNotNull();
        long pending = this.igdbImageRepository.countIgdbImageByAwsUrlIsNull();

        return ImageUploadStats.builder()
                .uploaded(uploaded)
                .pending(pending)
                .build();
    }

}
