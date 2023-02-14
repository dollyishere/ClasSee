package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PhotocardRegistPostReq")
public class PhotocardRegistPostReq {

    @ApiModelProperty(name="photocard_title", example="글 제목")
    String title;

    @ApiModelProperty(name="photocard_content", example="글 내용")
    String content;

    @ApiModelProperty(name="photocard_img", example="첨부 이미지")
    String img;

    @ApiModelProperty(name="photocard_sign", example="서명")
    String sign;

    @ApiModelProperty(name="user_email", example="사용자 이메일")
    String userEmail;

    @ApiModelProperty(name="lesson_id", example="강의 아이디")
    Long lessonId;

    @ApiModelProperty(name="openLesson_id", example ="열린 강의 아이디")
    Long openLessonId;

}
