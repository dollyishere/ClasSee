package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeUpdatePutRequest")
public class NoticeUpdatePutReq {

    @ApiModelProperty(name="id", example="notice_id")
    Long id;

    @ApiModelProperty(name="email", example="user_email")
    String email;

    @ApiModelProperty(name="title", example="notice_title")
    String title;

    @ApiModelProperty(name="content", example="notice_content")
    String content;

    @ApiModelProperty(name="img", example="notice_img")
    String img;

}
