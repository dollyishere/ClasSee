package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeCreatePostRequest")
public class NoticeCreatePostReq {

    @ApiModelProperty(name="email", example="user_email")
    String email;

    @ApiModelProperty(name="email", example="notice_title")
    String title;

    @ApiModelProperty(name="email", example="notice_content")
    String content;

    @ApiModelProperty(name="img", example="notice_img")
    String img;



}
