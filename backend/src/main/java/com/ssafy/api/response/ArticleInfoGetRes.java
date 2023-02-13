package com.ssafy.api.response;

import com.ssafy.db.entity.board.Article;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@ApiModel("ArticleInfoRes")
public class ArticleInfoGetRes {

    Long id;

    Long hit;

    String title;

    String content;

    String img;

    Timestamp regtime;

    String user_email;

    String user_nickname;

    String user_img;

    public ArticleInfoGetRes(Article article){
        this.id = article.getId();
        this.hit = article.getHit();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.img = article.getImg();
        this.regtime = article.getRegtime();
        this.user_email = article.getUser().getAuth().getEmail();
        this.user_nickname = article.getUser().getNickname();
        this.user_img = article.getUser().getImg();
    }

}
