package com.ssafy.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("InvalidErrorResponseBody")
public class InvalidErrorResponseBody {

    @ApiModelProperty(name="응답 메시지", example = "INVALID")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "401")
    Integer statusCode = null;

    public InvalidErrorResponseBody(){}

    public InvalidErrorResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public InvalidErrorResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static InvalidErrorResponseBody of(Integer statusCode, String message){
        InvalidErrorResponseBody body = new InvalidErrorResponseBody();
        body.statusCode = statusCode;
        body.message = message;
        return body;
    }



}
