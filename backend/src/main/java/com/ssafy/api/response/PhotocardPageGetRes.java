package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("PhotocardPageGetRes")
public class PhotocardPageGetRes {

    Integer statusCode;

    String message;

    Long count;

    List<PhotocardListGetRes> page;

}
