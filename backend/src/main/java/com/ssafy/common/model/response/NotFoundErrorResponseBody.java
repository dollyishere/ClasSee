package com.ssafy.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NotFoundErrorResponseBody")
public class NotFoundErrorResponseBody {

    @ApiModelProperty(name="응답 메시지", example = "NOT FOUND")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "404")
    Integer statusCode = null;

    public NotFoundErrorResponseBody(){}

    public NotFoundErrorResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public NotFoundErrorResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static NotFoundErrorResponseBody of(Integer statusCode, String message){
        NotFoundErrorResponseBody body = new NotFoundErrorResponseBody();
        body.statusCode = statusCode;
        body.message = message;
        return body;
    }

}
