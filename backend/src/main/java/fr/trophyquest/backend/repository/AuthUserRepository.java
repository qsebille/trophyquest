package fr.trophyquest.backend.repository;

import fr.trophyquest.backend.domain.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<AuthUser, UUID> {
    Optional<AuthUser> findByCognitoSub(String cognitoSub);
}
