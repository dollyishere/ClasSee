package com.ssafy.api.response;

import com.ssafy.db.entity.qna.Qna;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QnaInfoGetRes")
public class QnaInfoGetRes {

    Long id;

    String title;

    String content;

    String regTime;

    String user_email;

    String user_nickname;

    String user_img;

    public QnaInfoGetRes(Qna qna){
        this.id = qna.getId();
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.regTime = qna.getRegTime();
        this.user_email = qna.getUser().getAuth().getEmail();
        this.user_nickname = qna.getUser().getNickname();
        this.user_img = qna.getUser().getImg();
    }

}
