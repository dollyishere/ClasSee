package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ArticleUpdatePutRequest")
public class ArticleUpdatePutReq {

    @ApiModelProperty(example="사용자 이메일")
    String email;

    @ApiModelProperty(example="글 제목")
    String title;

    @ApiModelProperty(example="글 내용")
    String content;

    @ApiModelProperty(example="첨부 이미지")
    String img;

}
