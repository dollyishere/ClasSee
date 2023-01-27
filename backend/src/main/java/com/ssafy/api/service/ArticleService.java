package com.ssafy.api.service;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.ArticleUpdatePutReq;
import com.ssafy.db.entity.board.Article;

import java.util.List;

public interface ArticleService {

    void createArticle(ArticleRegisterPostReq articleRegisterPostReq);
    Article readArticle(Long id);
    List<Article> readArticleList(int offset, int limit);
    Long articleCount();
    void updateArticle(ArticleUpdatePutReq articleUpdatePutReq) throws Exception;
    void deleteArticle(String email, Long id) throws Exception;

}
