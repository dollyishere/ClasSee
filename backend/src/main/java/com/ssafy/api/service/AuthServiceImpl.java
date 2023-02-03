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
    public void logout(String email, String accessToken) throws Exception{
        Long expiration = JwtTokenUtil.getExpiration(accessToken); // 현재 로그인된 유저의 엑세스 토큰 유효시간

        // redis에 사용자 이메일의 키값이 존재한다면, 해당 레코드를 지운다
        if (redisService.getValues(email) != null) redisService.deleteValues(email);

        /*
         * redis에
         *   KEY: access_token
         *   VALUE: "logout" 으로 저장하여, 이전 구한 토큰의 유효시간동안 해당 엑세스토큰을 사용하지 못하게 처리
         */
        redisService.setBlackList("logout", accessToken, expiration);
    }
}
