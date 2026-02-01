package fr.trophyquest.backend.service;

import fr.trophyquest.backend.domain.entity.Player;
import fr.trophyquest.backend.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvocationType;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

import java.util.Optional;

@Service
public class PsnFetcherService {
    private final LambdaClient lambdaClient;
    private final PlayerRepository playerRepository;


    public PsnFetcherService(LambdaClient lambdaClient, PlayerRepository playerRepository) {
        this.lambdaClient = lambdaClient;
        this.playerRepository = playerRepository;
    }

    public InvokeResponse trigger(String profileName) throws Exception {
        Optional<Player> player = playerRepository.findByPseudo(profileName).stream().findFirst();
        if (player.isPresent()) {
            throw new Exception("Player already in database!");
        } else {
            String safeProfileName = profileName.replace("\"", "\\\"").trim();
            String payload = "{\"profileName\":\"" + safeProfileName + "\"}";

            InvokeRequest req = InvokeRequest.builder()
                    .functionName("trophyquest-psn-fetcher")
                    .invocationType(InvocationType.REQUEST_RESPONSE)
                    .payload(SdkBytes.fromUtf8String(payload))
                    .build();

            return lambdaClient.invoke(req);
        }
    }
}