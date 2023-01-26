package com.ssafy.api.service;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.db.entity.board.Article;

public interface ArticleService {

    void createArticle(ArticleRegisterPostReq articleRegisterPostReq);
    Article readArticle();
    void updateArticle();
    void deleteArticle(String email, Long id) throws Exception;

}
