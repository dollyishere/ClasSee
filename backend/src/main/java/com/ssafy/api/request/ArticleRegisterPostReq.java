package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ArticleRegisterPostRequest")
public class ArticleRegisterPostReq {

    @ApiModelProperty(name="작성자 이메일", example="user_email")
    String email;
    @ApiModelProperty(name="제목", example="article_title")
    String title;
    @ApiModelProperty(name="내용", example="article_content")
    String content;
    @ApiModelProperty(name="이미지 주소", example="article_img")
    String img;

}
