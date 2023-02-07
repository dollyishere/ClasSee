package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLogoutPostRequest")
public class UserUpdatePwPutReq {

    @ApiModelProperty(name="유저 Password", example="비밀번호")
    String password;

}
