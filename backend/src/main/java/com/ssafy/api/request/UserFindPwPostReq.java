package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindPwPostReq")
public class UserFindPwPostReq {
    @ApiModelProperty(name="email", example="your_email")
    String email;

    @ApiModelProperty(name="name", example="your_name")
    String name;
}
