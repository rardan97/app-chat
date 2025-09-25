package com.blackcode.app_chat_be.security.service;

import com.blackcode.app_chat_be.exception.TokenRefreshException;
import com.blackcode.app_chat_be.model.UserRefreshToken;
import com.blackcode.app_chat_be.model.Users;
import com.blackcode.app_chat_be.repository.UserRefreshTokenRepository;
import com.blackcode.app_chat_be.repository.UserRepository;
import com.blackcode.app_chat_be.repository.UserTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserRefreshTokenService {
    @Value("${blackcode.app.jwtRefreshExpirationMs}")
    private int refreshTokenDurationMs;

    @Autowired
    private UserRefreshTokenRepository userRefreshTokenRepository;

    @Autowired
    private UserTokenRepository userTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTokenService userTokenService;

    public Optional<UserRefreshToken> findByToken(String token){
        return userRefreshTokenRepository.findByToken(token);
    }

    public UserRefreshToken createRefreshToken(String jwt, Long userId){
        UserRefreshToken userRefreshToken = null;
        Optional<UserRefreshToken> existingToken = userRefreshTokenRepository.findByUserId(userId);
        if (existingToken.isPresent()) {
            userRefreshToken = new UserRefreshToken();
            userRefreshToken.setId(existingToken.get().getId());
            userRefreshToken.setUser(existingToken.get().getUser());
            userRefreshToken.setExpiryDate(existingToken.get().getExpiryDate());
            userRefreshToken.setToken(existingToken.get().getToken());
        }else{
            Users dataUser = userRepository.findById(userId).get();
            userRefreshToken = new UserRefreshToken();
            userRefreshToken.setUser(dataUser);
            userRefreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
            userRefreshToken.setToken(UUID.randomUUID().toString());
            userRefreshToken = userRefreshTokenRepository.save(userRefreshToken);
        }
        userTokenService.processUserTokenAdd(userId, jwt);
        return userRefreshToken;
    }

    public UserRefreshToken verifyExpiration(UserRefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            userRefreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public void deleteByUserId(Long userId){
        userRefreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
}
