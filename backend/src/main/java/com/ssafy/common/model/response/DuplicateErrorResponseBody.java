package com.ssafy.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DuplicateErrorResponseBody")
public class DuplicateErrorResponseBody {

    @ApiModelProperty(name="응답 메시지", example = "DUPLICATE")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "409")
    Integer statusCode = null;

    public DuplicateErrorResponseBody() {}

    public DuplicateErrorResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public DuplicateErrorResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static DuplicateErrorResponseBody of(Integer statusCode, String message) {
        DuplicateErrorResponseBody body = new DuplicateErrorResponseBody();
        body.message = message;
        body.statusCode = statusCode;
        return body;
    }

}
