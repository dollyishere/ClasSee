package com.ssafy.api.service;


/**
 *	인증 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface AuthService {

    int saveRefreshToken(String email, String token);

    void logout(String email, String accessToken);
}
