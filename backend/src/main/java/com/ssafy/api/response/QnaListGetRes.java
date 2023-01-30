package com.ssafy.api.response;

import com.ssafy.db.entity.qna.Qna;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QnaListGetRes")
public class QnaListGetRes {

    Long id;

    String title;

    String user_email;

    String user_nickname;

    String regtime;

    public QnaListGetRes(Qna qna){
        this.id = qna.getId();
        this.title = qna.getTitle();
        this.user_email = qna.getUser().getAuth().getEmail();
        this.user_nickname = qna.getUser().getNickname();
        this.regtime = qna.getRegTime();
    }
}
