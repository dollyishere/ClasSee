package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QnaUpdatePutRequest")
public class QnaUpdatePutReq {

    Long id;

    String title;

    String content;

    String user_email;


}
