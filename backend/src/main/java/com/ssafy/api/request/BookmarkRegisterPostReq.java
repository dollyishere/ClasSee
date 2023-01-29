package com.ssafy.api.request;

import com.ssafy.db.entity.user.Bookmark;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BookmarkRegisterPostRequest")
public class BookmarkRegisterPostReq {
    @ApiModelProperty(name="유저 email", example="email")
    String email;
    @ApiModelProperty(name="강의 id", example="lesson_id")
    Long lesson_id;
}
