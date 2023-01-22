package com.ssafy.api.service;

import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.repository.AuthRepository;
import com.ssafy.db.repository.AuthRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service("authService")
public class AuthServiceImpl implements AuthService{
    @Autowired
    AuthRepository authRepository;

    @Autowired
    AuthRepositorySupport authRepositorySupport;

    @Autowired
    RedisService redisService;

    @Override
    public int saveRefreshToken(String email, String token) {
        return authRepository.saveRefreshToken(email, token);
    }

    @Override
    public void logout(String email, String accessToken) {
        Long expiration = JwtTokenUtil.getExpiration(accessToken);
        System.out.println("authentication ID >>>>>>>>>> " + SecurityContextHolder.getContext().getAuthentication().getName());
        if (redisService.getValues(email) != null) redisService.deleteValues(email);

        redisService.setValues(accessToken, "logout", expiration);
    }
}
