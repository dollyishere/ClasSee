package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeUpdatePutRequest")
public class NoticeUpdatePutReq {

    @ApiModelProperty(name="id", example="공지사항 아이디")
    Long id;

    @ApiModelProperty(name="email", example="사용자 이메일")
    String email;

    @ApiModelProperty(name="title", example="공지사항 제목")
    String title;

    @ApiModelProperty(name="content", example="공지사항 내용")
    String content;

    @ApiModelProperty(name="img", example="첨부 이미지")
    String img;

}
