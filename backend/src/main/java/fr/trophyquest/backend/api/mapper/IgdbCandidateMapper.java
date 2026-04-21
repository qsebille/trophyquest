package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.igdb.IgdbCandidateDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.constants.GameImageType;
import fr.trophyquest.backend.constants.IgdbGameImageType;
import fr.trophyquest.backend.domain.entity.PsnGame;
import fr.trophyquest.backend.domain.entity.PsnGameImage;
import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import fr.trophyquest.backend.domain.entity.igdb.IgdbImage;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class IgdbCandidateMapper {

    private String findCoverUrl(IgdbGame game) {
        return game.getImages().stream()
                .filter(ig -> IgdbGameImageType.COVER.getValue().equals(ig.getImageType()))
                .map(IgdbImage::getImageUrl)
                .findFirst()
                .orElse(null);
    }

    private IgdbCandidateDTO toDTO(IgdbCandidate entity) {
        IgdbGame igdbGame = entity.getCandidate();
        String coverUrl = findCoverUrl(igdbGame);

        return IgdbCandidateDTO.builder()
                .id(entity.getId().getCandidateId())
                .name(igdbGame.getName())
                .gameType(igdbGame.getGameType())
                .cover(coverUrl)
                .releaseDate(igdbGame.getReleaseDate())
                .score(entity.getScore())
                .build();
    }

    public IgdbMappingDTO toMappingDTO(PsnGame game) {
        List<IgdbCandidateDTO> candidates = game.getIgdbCandidates()
                .stream()
                .map(this::toDTO)
                .sorted(Comparator.comparing(IgdbCandidateDTO::score, Comparator.nullsLast(Comparator.naturalOrder())))
                .toList();

        String imageUrl = game.getImages()
                .stream()
                .filter(image -> GameImageType.MASTER.getValue().equals(image.getType()))
                .map(PsnGameImage::getUrl)
                .findFirst()
                .orElse(null);

        return IgdbMappingDTO.builder()
                .psnGameId(game.getId())
                .psnGameName(game.getName())
                .psnGameImageUrl(imageUrl)
                .candidates(candidates)
                .build();
    }
}
