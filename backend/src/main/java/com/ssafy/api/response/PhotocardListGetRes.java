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
    String userEmail;
    String userNickname;
    String lessonName;
    Long likesCount;
    Boolean isLiked;

    public PhotocardListGetRes(Photocard photocard, Long likesCount, Boolean isLiked){
        this.id = photocard.getId();
        this.title = photocard.getTitle();
        this.content = photocard.getContent();
        this.img = photocard.getImg();
        this.sign = photocard.getSign();
        this.regDate = photocard.getRegDate();
        this.userEmail = photocard.getUser().getAuth().getEmail();
        this.userNickname = photocard.getUser().getNickname();
        this.lessonName = photocard.getLesson_name();
        this.likesCount = likesCount;
        this.isLiked = isLiked;

    }

}
