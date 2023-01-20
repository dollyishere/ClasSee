package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ApiModel("UserEmailCheckGetReq")
public class UserEmailCheckGetReq {
    @ApiModelProperty(name = "유저 email")
    String email;

}

