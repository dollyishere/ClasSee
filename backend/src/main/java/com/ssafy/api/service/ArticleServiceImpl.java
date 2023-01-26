package com.ssafy.api.service;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.db.entity.board.Article;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.ArticleRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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
    public Article readArticle() {
        return null;
    }

    @Override
    public void updateArticle() {

    }

    @Override
    public void deleteArticle(String email, Long id) throws Exception {
        User user = userRepositorySupport
                .findUserByAuth(email)
                .get();

        Article article = articleRepositorySupport.findOne(id);

        if(article.getUser().getId() == user.getId()){
            articleRepositorySupport.delete(article);
        } else {
            throw new Exception("작성자와 다릅니다.");
        }

        return;
    }
}
