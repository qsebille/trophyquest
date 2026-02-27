package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.stats.ImageUploadStats;
import fr.trophyquest.backend.repository.GameImageRepository;
import fr.trophyquest.backend.repository.IgdbImageRepository;
import fr.trophyquest.backend.repository.PlayerRepository;
import fr.trophyquest.backend.repository.TrophyRepository;
import fr.trophyquest.backend.repository.TrophySuiteRepository;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final GameImageRepository gameImageRepository;
    private final IgdbImageRepository igdbImageRepository;
    private final TrophySuiteRepository trophySuiteRepository;
    private final TrophyRepository trophyRepository;
    private final PlayerRepository playerRepository;


    public ImageService(
            GameImageRepository gameImageRepository,
            IgdbImageRepository igdbImageRepository,
            TrophySuiteRepository trophySuiteRepository,
            TrophyRepository trophyRepository,
            PlayerRepository playerRepository
    ) {
        this.gameImageRepository = gameImageRepository;
        this.igdbImageRepository = igdbImageRepository;
        this.trophySuiteRepository = trophySuiteRepository;
        this.trophyRepository = trophyRepository;
        this.playerRepository = playerRepository;
    }

    public ImageUploadStats getUploadStats(String imageCategory) {
        return switch (imageCategory) {
            case "game" -> ImageUploadStats.builder()
                    .uploaded(this.gameImageRepository.countGameImageByAwsUrlIsNotNull())
                    .pending(this.gameImageRepository.countGameImageByAwsUrlIsNull())
                    .build();
            case "trophySuite" -> ImageUploadStats.builder()
                    .uploaded(this.trophySuiteRepository.countTrophySuiteByAwsImageUrlIsNotNull())
                    .pending(this.trophySuiteRepository.countTrophySuiteByAwsImageUrlIsNull())
                    .build();
            case "trophy" -> ImageUploadStats.builder()
                    .uploaded(this.trophyRepository.countTrophyByAwsIconUrlIsNotNull())
                    .pending(this.trophyRepository.countTrophyByAwsIconUrlIsNull())
                    .build();
            case "player" -> ImageUploadStats.builder()
                    .uploaded(this.playerRepository.countPlayerByAwsAvatarUrlIsNotNull())
                    .pending(this.playerRepository.countPlayerByAwsAvatarUrlIsNull())
                    .build();
            case "igdb" -> ImageUploadStats.builder()
                    .uploaded(this.igdbImageRepository.countIgdbImageByAwsUrlIsNotNull())
                    .pending(this.igdbImageRepository.countIgdbImageByAwsUrlIsNull())
                    .build();
            default -> throw new IllegalArgumentException("Invalid image category: " + imageCategory);
        };
    }

}
