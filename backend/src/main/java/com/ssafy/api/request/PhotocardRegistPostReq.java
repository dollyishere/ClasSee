package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PhotocardRegistPostReq")
public class PhotocardRegistPostReq {

    @ApiModelProperty(name="photocard_title", example="제목")
    String title;

    @ApiModelProperty(name="photocard_content", example="내용")
    String content;

    @ApiModelProperty(name="photocard_img", example="이미지")
    String img;

    @ApiModelProperty(name="photocard_sign", example="싸인")
    String sign;

    @ApiModelProperty(name="user_email", example="사용자 로그인")
    String user_email;

    @ApiModelProperty(name="lesson_id", example="강의 아이디")
    Long lesson_id;

}
