package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import java.sql.Timestamp;

@Getter
@Setter
@ApiModel("ReviewRegistPostReq")
public class ReviewRegistPostReq {

    @ApiModelProperty(name="리뷰 제목", example="review_title")
    String title;

    @ApiModelProperty(name="리뷰 내용", example="review_content")
    String content;

    @ApiModelProperty(name="리뷰 이미지", example="review_img")
    String img;

    @ApiModelProperty(name="리뷰 점수", example="review_score")
    Long score;

    @ApiModelProperty(name="유저 email", example="사용자 이메일")
    String user_email;

    @ApiModelProperty(name="열린 강의 id", example="openLesson_id")
    Long openLesson_id;


}
