package com.ssafy.api.service;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.ArticleUpdatePutReq;
import com.ssafy.db.entity.board.Article;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.ArticleRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service("articleService")
@Transactional
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    ArticleRepositorySupport articleRepositorySupport;
    @Autowired
    UserRepositorySupport userRepositorySupport;


    @Override
    public void createArticle(ArticleRegisterPostReq articleRegisterPostReq) {
        User user = userRepositorySupport
                .findUserByAuth(articleRegisterPostReq.getEmail())
                .get();

        Article article = Article.builder()
                .title(articleRegisterPostReq.getTitle())
                .content(articleRegisterPostReq.getContent())
                .img(articleRegisterPostReq.getImg())
                .hit(0L)
                .user(user)
                .build();

        articleRepositorySupport.save(article);
    }

    @Override
    public Article readArticle(Long id) {

        articleRepositorySupport.updateHit(id);
        return articleRepositorySupport.findOne(id);

    }

    @Override
    @Transactional(readOnly = true)
    public List<Article> readArticleList(int offset, int limit) {
        return articleRepositorySupport
                .findList(offset, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public Long articleCount(){
        return articleRepositorySupport
                .articleCount();
    }

    @Override
    public void updateArticle(ArticleUpdatePutReq articleUpdatePutReq){

            articleRepositorySupport.updateArticle(articleUpdatePutReq);
            return;
    }

    @Override
    public void deleteArticle(Long id) {
        Article article = articleRepositorySupport.findOne(id);

        articleRepositorySupport.delete(article);

        return;
    }
}
