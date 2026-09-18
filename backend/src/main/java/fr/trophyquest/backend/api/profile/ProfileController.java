package fr.trophyquest.backend.api.profile;


import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.profile.dto.ProfileDetailsResponse;
import fr.trophyquest.backend.api.profile.dto.ProfileSuiteItem;
import fr.trophyquest.backend.api.profile.dto.ProfileTrophyItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @GetMapping("/{playerId}/details")
    public ProfileDetailsResponse fetchDetails(@PathVariable UUID playerId) {
        return profileService.fetchDetails(playerId);
    }

    @GetMapping("/{playerId}/suites")
    public Pagination<ProfileSuiteItem> searchSuites(@PathVariable UUID playerId,
                                                     @RequestParam(name = "page", defaultValue = "0") int page,
                                                     @RequestParam(name = "size", defaultValue = "10") int size) {
        return profileService.searchSuites(playerId, page, size);
    }

    @GetMapping("/{playerId}/trophies")
    public Pagination<ProfileTrophyItem> searchTrophies(@PathVariable UUID playerId,
                                                        @RequestParam(name = "page", defaultValue = "0") int page,
                                                        @RequestParam(name = "size", defaultValue = "10") int size) {
        return profileService.searchTrophies(playerId, page, size);
    }

}
