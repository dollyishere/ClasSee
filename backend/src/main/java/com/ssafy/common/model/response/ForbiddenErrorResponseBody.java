package com.ssafy.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ForbiddenErrorResponseBody")
public class ForbiddenErrorResponseBody {

    @ApiModelProperty(name="응답 메시지", example = "FORBIDDEN")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "403")
    Integer statusCode = null;

    public ForbiddenErrorResponseBody(){}

    public ForbiddenErrorResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public ForbiddenErrorResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static ForbiddenErrorResponseBody of(Integer statusCode, String message){
        ForbiddenErrorResponseBody body = new ForbiddenErrorResponseBody();
        body.statusCode = statusCode;
        body.message = message;
        return body;
    }

}
