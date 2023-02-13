package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEmailCheckGetRes")
public class UserEmailCheckGetRes {

    @ApiModelProperty(name="email")
    String email;

    public static UserEmailCheckGetRes of(String email){
        UserEmailCheckGetRes res = new UserEmailCheckGetRes();
        res.setEmail(email);
        return res;
    }

}
