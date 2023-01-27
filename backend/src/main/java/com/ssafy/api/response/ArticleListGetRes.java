package com.ssafy.api.response;

import com.ssafy.db.entity.board.Article;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@ApiModel("ArticleListGetRes")
public class ArticleListGetRes {

    Long id;

    Long hit;

    String title;

    Timestamp regtime;

    Long user_id;

    String user_nickname;

    String user_img;

    public ArticleListGetRes(Article article){
        this.id = article.getId();
        this.hit = article.getHit();
        this.title = article.getTitle();
        this.regtime = article.getRegtime();
        this.user_id = article.getUser().getId();
        this.user_nickname = article.getUser().getNickname();
        this.user_img = article.getUser().getImg();
    }

}
