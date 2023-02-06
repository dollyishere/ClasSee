package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewUpdatePutReq")
public class ReviewUpdatePutReq {

    @ApiModelProperty(name="리뷰 id", example="review_id")
    Long id;

    @ApiModelProperty(name="리뷰 제목", example="review_title")
    String title;

    @ApiModelProperty(name="리뷰 내용", example="review_content")
    String content;

    @ApiModelProperty(name="리뷰 이미지", example="review_img")
    String img;

    @ApiModelProperty(name="리뷰 점수", example="review_score")
    Long score;

}
