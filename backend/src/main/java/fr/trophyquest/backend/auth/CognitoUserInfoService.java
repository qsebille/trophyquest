package fr.trophyquest.backend.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class CognitoUserInfoService {

    private final RestClient restClient;
    private final String userInfoUri;

    public CognitoUserInfoService(
            RestClient.Builder restClientBuilder,
            @Value("${cognito.user-info-uri}") String userInfoUri
    ) {
        this.restClient = restClientBuilder.build();
        this.userInfoUri = userInfoUri;
    }

    public CognitoUserInfo fetchUserInfo(String accessToken) {
        return restClient.get()
                .uri(userInfoUri)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .body(CognitoUserInfo.class);
    }
}