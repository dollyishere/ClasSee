package com.ssafy.api.response;

import com.ssafy.db.entity.board.Notice;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeInfoRes")
public class NoticeInfoRes {

    Long id;

    String title;

    String content;

    String img;

    String regtime;

    String user_nickname;

    public NoticeInfoRes(Notice notice){
        this.id = notice.getId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.img = notice.getImg();
        this.regtime = notice.getRegtime();
        this.user_nickname = notice.getUser().getNickname();
    }


}
