package com.ssafy.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@ApiModel("UserEmailPwDto")
public class UserEmailPwDto {
    @ApiModelProperty(name="유저 email", example="your_email")
    String email;
    @ApiModelProperty(name="유저 비밀번호", example="your_password")
    String password;
}
