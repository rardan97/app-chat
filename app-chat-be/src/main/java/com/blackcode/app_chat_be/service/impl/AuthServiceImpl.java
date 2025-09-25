package com.blackcode.app_chat_be.service.impl;

import com.blackcode.app_chat_be.dto.auth.*;
import com.blackcode.app_chat_be.exception.TokenRefreshException;
import com.blackcode.app_chat_be.model.UserRefreshToken;
import com.blackcode.app_chat_be.model.UserToken;
import com.blackcode.app_chat_be.model.Users;
import com.blackcode.app_chat_be.repository.UserRepository;
import com.blackcode.app_chat_be.repository.UserTokenRepository;
import com.blackcode.app_chat_be.security.jwt.JwtUtils;
import com.blackcode.app_chat_be.security.service.UserDetailsImpl;
import com.blackcode.app_chat_be.security.service.UserRefreshTokenService;
import com.blackcode.app_chat_be.security.service.UserTokenService;
import com.blackcode.app_chat_be.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final UserTokenService userTokenService;
    private final UserRefreshTokenService userRefreshTokenService;
    private final UserTokenRepository userTokenRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserTokenService userTokenService, UserRefreshTokenService userRefreshTokenService, UserTokenRepository userTokenRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userTokenService = userTokenService;
        this.userRefreshTokenService = userRefreshTokenService;
        this.userTokenRepository = userTokenRepository;
    }


    @Override
    public JwtRes authenticateUser(LoginReq loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtTokenUser(userDetails);
        userTokenService.processUserTokenRefresh(userDetails.getUsername(), jwt);
        UserRefreshToken refreshToken = userRefreshTokenService.createRefreshToken(jwt, userDetails.getUserId());

        return new JwtRes(jwt, refreshToken.getToken(), userDetails.getUserId(), userDetails.getUsername());
    }

    @Override
    public MessageRes registerUser(SignUpReq signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }

        Users user = new Users(
                signupRequest.getDisplayName(),
                signupRequest.getEmail(),
                signupRequest.getUsername(),
                encoder.encode(signupRequest.getPassword())
        );

        userRepository.save(user);
        return new MessageRes("User registered successfully!");
    }

    @Override
    public TokenRefreshRes refreshToken(TokenRefreshReq request) {
        String requestRefreshToken = request.getRefreshToken();
        return userRefreshTokenService.findByToken(requestRefreshToken)
                .map(userRefreshTokenService::verifyExpiration)
                .map(UserRefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    userTokenService.processUserTokenRefresh(user.getUsername(), token);
                    return new TokenRefreshRes(token, requestRefreshToken);
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @Override
    public MessageRes logout(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !(authentication instanceof AnonymousAuthenticationToken)) {
            String token = request.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                Long userId = userDetails.getUserId();
                String jwtToken = token.substring(7);

                Optional<UserToken> userTokenData = userTokenRepository.findByToken(jwtToken);
                if (userTokenData.isPresent()) {
                    userRefreshTokenService.deleteByUserId(userId);
                    userTokenData.get().setIsActive(false);
                    userTokenRepository.save(userTokenData.get());
                    return new MessageRes("Log out successful!");
                }
            }
        }
        return new MessageRes("Log out failed!");
    }
}
