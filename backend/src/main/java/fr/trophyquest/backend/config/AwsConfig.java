package fr.trophyquest.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.lambda.LambdaClient;

@Configuration
public class AwsConfig {
    @Bean
    public LambdaClient lambdaClient() {
        return LambdaClient.builder()
                .region(Region.EU_WEST_3)
                .build();
    }
}
