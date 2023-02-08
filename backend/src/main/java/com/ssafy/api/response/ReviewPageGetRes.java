package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ReviewPageGetRes")
public class ReviewPageGetRes {

    Long count;

    List<ReviewListGetRes> page;


}
