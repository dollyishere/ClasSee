package com.ssafy.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ServerErrorResponseBody")
public class ServerErrorResponseBody {

    @ApiModelProperty(name="응답 메시지", example = "SERVER ERROR")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "500")
    Integer statusCode = null;

    public ServerErrorResponseBody(){}

    public ServerErrorResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public ServerErrorResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static ServerErrorResponseBody of(Integer statusCode, String message){
        ServerErrorResponseBody body = new ServerErrorResponseBody();
        body.statusCode = statusCode;
        body.message = message;
        return body;
    }

}
