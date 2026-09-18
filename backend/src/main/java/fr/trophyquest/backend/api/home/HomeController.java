package fr.trophyquest.backend.api.home;


import fr.trophyquest.backend.api.home.dto.HomeGameItem;
import fr.trophyquest.backend.api.home.dto.HomePlayerItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }


    @GetMapping("/top-games")
    public List<HomeGameItem> fetchTopGames(@RequestParam(name = "size", defaultValue = "10") int size) {
        return homeService.fetchTopGames(size);
    }

    @GetMapping("/top-players")
    public List<HomePlayerItem> fetchTopPlayers(@RequestParam(name = "size", defaultValue = "10") int size) {
        return homeService.fetchTopPlayers(size);
    }

}
