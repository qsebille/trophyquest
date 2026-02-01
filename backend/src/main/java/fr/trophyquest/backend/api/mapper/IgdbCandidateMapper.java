package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.igdb.IgdbCandidateDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.constants.GameImageType;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.GameImage;
import fr.trophyquest.backend.domain.entity.igdb.IgdbCandidate;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class IgdbCandidateMapper {
    private IgdbCandidateDTO toDTO(IgdbCandidate entity) {
        return IgdbCandidateDTO.builder()
                .id(entity.getId().getCandidateId())
                .name(entity.getCandidate().getName())
                .gameType(entity.getCandidate().getGameType())
                .website(entity.getCandidate().getWebsite())
                .cover(entity.getCandidate().getCover())
                .releaseDate(entity.getCandidate().getReleaseDate())
                .score(entity.getScore())
                .build();
    }

    public IgdbMappingDTO toMappingDTO(Game game) {
        List<IgdbCandidateDTO> candidates = game.getIgdbCandidates().stream()
                .map(this::toDTO)
                .sorted(Comparator.comparing(IgdbCandidateDTO::score, Comparator.nullsLast(Comparator.naturalOrder())))
                .toList();

        String imageUrl = game.getImages().stream()
                .filter(image -> GameImageType.MASTER.getValue().equals(image.getType()))
                .map(GameImage::getUrl)
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
