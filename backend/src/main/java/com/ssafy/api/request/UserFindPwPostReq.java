package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindPwPostReq")
public class UserFindPwPostReq {
    @ApiModelProperty(name="유저 email", example="your_email")
    String email;
    @ApiModelProperty(name="유저 이름", example="your_name")
    String name;
}
