package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("OrdersRegistPostRequest")
public class OrdersRegistPostReq {

    @ApiModelProperty(name="email", example="user_email")
    String email;
    @ApiModelProperty(name="openLesson id", example="openLesson_id")
    Long openLesson_id;
    @ApiModelProperty(name="phone", example="user_phone")
    String phone;
    @ApiModelProperty(name="total price", example="total_price")
    Long price;


}
