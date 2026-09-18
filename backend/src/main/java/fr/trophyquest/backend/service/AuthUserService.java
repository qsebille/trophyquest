package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.user.UserDTO;
import fr.trophyquest.backend.api.mapper.AuthUserMapper;
import fr.trophyquest.backend.auth.CognitoUserInfo;
import fr.trophyquest.backend.domain.entity.User;
import fr.trophyquest.backend.domain.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthUserService {

    private final UserRepository userRepository;
    private final AuthUserMapper authUserMapper;

    public AuthUserService(
            UserRepository userRepository,
            AuthUserMapper authUserMapper
    ) {
        this.userRepository = userRepository;
        this.authUserMapper = authUserMapper;
    }

    public UserDTO fetchCurrentUser(CognitoUserInfo cognitoUserInfo) {
        String cognitoSub = cognitoUserInfo.sub();
        User user = this.userRepository.findByCognitoSub(cognitoSub)
                .orElseGet(() -> {
                    try {
                        return createAndSaveFromCognito(cognitoUserInfo);
                    } catch (DataIntegrityViolationException e) {
                        return this.userRepository.findByCognitoSub(cognitoSub)
                                .orElseThrow(() -> e);
                    }
                });

        return authUserMapper.toDTO(user);
    }

    protected User createAndSaveFromCognito(CognitoUserInfo cognitoUserInfo) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail(cognitoUserInfo.email());
        user.setDisplayName(cognitoUserInfo.preferredUsername());
        user.setCognitoSub(cognitoUserInfo.sub());
        this.userRepository.save(user);
        return user;
    }
}
