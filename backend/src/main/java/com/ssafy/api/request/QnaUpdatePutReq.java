package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QnaUpdatePutRequest")
public class QnaUpdatePutReq {

    @ApiModelProperty(example="QnA 아이디")
    Long id;

    @ApiModelProperty(example="QnA 제목")
    String title;

    @ApiModelProperty(example="QnA 내용")
    String content;

    @ApiModelProperty(example="사용자 이메일")
    String user_email;
}
