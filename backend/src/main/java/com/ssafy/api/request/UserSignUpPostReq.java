package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserSignUpPostReq")
@NoArgsConstructor
public class UserSignUpPostReq {

    @ApiModelProperty(name="유저 이메일", example="auth_email")
    String email;
    @ApiModelProperty(name="유저 비밀번호", example="auth_password")
    String password;
    @ApiModelProperty(name="유저 이름", example="user_name")
    String name;
    @ApiModelProperty(name="유저 닉네임", example="user_nickname")
    String nickname;
    @ApiModelProperty(name="유저 주소", example="user_address")
    String address;
    @ApiModelProperty(name="유저 생년월일", example="user_birth")
    String birth;
    @ApiModelProperty(name="유저 폰번호", example="user_phone")
    String phone;
    @ApiModelProperty(name="유저 이미지", example="user_img")
    String img;
    @ApiModelProperty(name="유저 가입시기", example="user_createdAt")
    String createdAt;

}
