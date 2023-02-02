package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QnaAnswerRegistPostRequest")
public class QnaAnswerRegistPostReq {

    @ApiModelProperty(name="Answer 내용", example="answer_content")
    String content;

//    @ApiModelProperty(name="qna 작성시간", example="qna_regtime")
//    Timestamp regtime;

    @ApiModelProperty(name="qna id", example="qna_id")
    Long qna_id;
}
