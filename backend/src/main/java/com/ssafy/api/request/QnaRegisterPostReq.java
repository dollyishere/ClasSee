package com.ssafy.api.request;

import com.ssafy.db.entity.qna.Qna;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@ApiModel("QnaRegistePostRequest")
public class QnaRegisterPostReq {

    @ApiModelProperty(name="qna 제목", example="qna_title")
    String title;

    @ApiModelProperty(name="qna 내용", example="qna_content")
    String content;

//    @ApiModelProperty(name="qna 작성시간", example="qna_regtime")
//    Timestamp regtime;

    @ApiModelProperty(name="qna 작성자 이메일", example="email")
    String user_email;

}
