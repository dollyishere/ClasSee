package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ArticleUpdatePutRequest")
public class ArticleUpdatePutReq {

    String email;

    Long id;

    String title;

    String content;

    String img;

}
