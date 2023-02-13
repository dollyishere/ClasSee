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

    String userEmail;

    String userNickname;

    String userImg;

    public QnaInfoGetRes(Qna qna){
        this.id = qna.getId();
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.regTime = qna.getRegTime();
        this.userEmail = qna.getUser().getAuth().getEmail();
        this.userNickname = qna.getUser().getNickname();
        this.userImg = qna.getUser().getImg();
    }

}
