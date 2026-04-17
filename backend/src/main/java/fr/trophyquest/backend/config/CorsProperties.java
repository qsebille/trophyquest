package fr.trophyquest.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Getter
public class CorsProperties {
    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;
}