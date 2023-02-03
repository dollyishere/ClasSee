package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/logout) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserLogoutPostRequest")
public class UserLogoutPostReq {
    @ApiModelProperty(name = "유저 email", example = "사용자 이메일")
    String email;

    @ApiModelProperty(name = "엑세스 토큰", example = "엑세스 토큰")
    String accessToken;
}
