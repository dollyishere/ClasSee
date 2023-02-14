package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewRegistRes")
public class ReviewRegistRes {

    Long id;

    String message;

    Integer statusCode;

}
