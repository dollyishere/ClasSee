package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("OrdersRegistPostRequest")
public class OrdersRegistPostReq {

    @ApiModelProperty(name="email", example="사용자 이메일")
    String email;
    @ApiModelProperty(name="openLesson id", example="개설 강의 아이디")
    Long openLessonId;
    @ApiModelProperty(name="phone", example="연락처")
    String phone;
    @ApiModelProperty(name="total price", example="총 결제 금액")
    Long price;


}
