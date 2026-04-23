package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.stats.ImageUploadStats;
import fr.trophyquest.backend.repository.PlayerRepository;
import fr.trophyquest.backend.repository.igdb.IgdbImageRepository;
import fr.trophyquest.backend.repository.psn.PsnGameImageRepository;
import fr.trophyquest.backend.repository.psn.PsnTrophyRepository;
import fr.trophyquest.backend.repository.psn.PsnTrophySuiteRepository;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final PsnGameImageRepository gameImageRepository;
    private final IgdbImageRepository igdbImageRepository;
    private final PsnTrophySuiteRepository trophySuiteRepository;
    private final PsnTrophyRepository trophyRepository;
    private final PlayerRepository playerRepository;


    public ImageService(
            PsnGameImageRepository gameImageRepository,
            IgdbImageRepository igdbImageRepository,
            PsnTrophySuiteRepository trophySuiteRepository,
            PsnTrophyRepository trophyRepository,
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
