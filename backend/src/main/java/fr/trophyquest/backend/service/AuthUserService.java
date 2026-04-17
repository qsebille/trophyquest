package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.auth.user.AuthUserDTO;
import fr.trophyquest.backend.api.mapper.AuthUserMapper;
import fr.trophyquest.backend.auth.CognitoUserInfo;
import fr.trophyquest.backend.domain.entity.AuthUser;
import fr.trophyquest.backend.repository.AuthUserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthUserService {

    private final AuthUserRepository authUserRepository;
    private final AuthUserMapper authUserMapper;

    public AuthUserService(
            AuthUserRepository authUserRepository,
            AuthUserMapper authUserMapper
    ) {
        this.authUserRepository = authUserRepository;
        this.authUserMapper = authUserMapper;
    }

    public AuthUserDTO fetchCurrentUser(CognitoUserInfo cognitoUserInfo) {
        String cognitoSub = cognitoUserInfo.sub();
        AuthUser authUser = this.authUserRepository.findByCognitoSub(cognitoSub)
                .orElseGet(() -> saveUserFromJwt(cognitoUserInfo));

        return authUserMapper.toDTO(authUser);
    }

    private AuthUser saveUserFromJwt(CognitoUserInfo cognitoUserInfo) {
        AuthUser authUser = new AuthUser();
        authUser.setId(UUID.randomUUID());
        authUser.setEmail(cognitoUserInfo.email());
        authUser.setDisplayName(cognitoUserInfo.preferredUsername());
        authUser.setCognitoSub(cognitoUserInfo.sub());
        this.authUserRepository.save(authUser);
        return authUser;
    }
}
