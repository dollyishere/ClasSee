package com.ssafy.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@Getter
@ToString
public class KakaoUserDto {
    String accessToken;
    String refreshToken;

    // refresh_token_expires_in
    Long refreshTokenExpiresIn;

    // expires_in
    Long expiresIn;

}
