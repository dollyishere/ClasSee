package com.ssafy.api.response;

import com.ssafy.db.entity.board.Photocard;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PhotocardListGetRes")
public class PhotocardListGetRes {

    Long id;
    String title;
    String content;
    String img;
    String sign;
    String regDate;
    String user_email;
    String user_nickname;
    String lesson_name;

    public PhotocardListGetRes(Photocard photocard){
        this.id = photocard.getId();
        this.title = photocard.getTitle();
        this.content = photocard.getContent();
        this.img = photocard.getImg();
        this.sign = photocard.getSign();
        this.regDate = photocard.getRegDate();
        this.user_email = photocard.getUser().getAuth().getEmail();
        this.user_nickname = photocard.getUser().getNickname();
        this.lesson_name = photocard.getLesson().getName();
    }

}
