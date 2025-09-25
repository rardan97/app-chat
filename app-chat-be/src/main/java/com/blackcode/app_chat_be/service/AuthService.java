package com.blackcode.app_chat_be.service;

import com.blackcode.app_chat_be.dto.auth.*;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    JwtRes authenticateUser(LoginReq loginRequest);

    MessageRes registerUser(SignUpReq signupRequest);

    TokenRefreshRes refreshToken(TokenRefreshReq request);

    MessageRes logout(HttpServletRequest request);
}
