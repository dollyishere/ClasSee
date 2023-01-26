package com.ssafy.api.response;

import com.ssafy.db.entity.board.Article;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@ApiModel("ArticleInfoRes")
public class ArticleInfoRes {

    Long id;

    Long hit;

    String title;

    String content;

    String img;

    Timestamp regtime;

    Long user_id;

    String user_nickname;

    public ArticleInfoRes(Article article){
        this.id = article.getId();
        this.hit = article.getHit();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.img = article.getImg();
        this.regtime = article.getRegtime();
        this.user_id = article.getUser().getId();
        this.user_nickname = article.getUser().getNickname();
    }

}
