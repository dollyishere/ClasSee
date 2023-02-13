package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ApiModel("BookmarkInfoReq")
public class BookmarkRegisterReq {
    @ApiModelProperty(example="사용자 이메일")
    String email;
    @ApiModelProperty(example="강의 아이디")
    Long lesson_id;
}
