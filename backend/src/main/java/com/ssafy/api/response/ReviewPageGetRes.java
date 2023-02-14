package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ReviewPageGetRes")
public class ReviewPageGetRes {

    String message;

    Integer statusCode;

    Long count;

    List<ReviewListGetRes> page;


}
