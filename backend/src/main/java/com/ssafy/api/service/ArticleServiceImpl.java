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
    public void updateArticle(ArticleUpdatePutReq articleUpdatePutReq) throws Exception {
        User user = userRepositorySupport
                .findUserByAuth(articleUpdatePutReq.getEmail())
                .get();

        if(user.getAuth().getEmail().equals(articleUpdatePutReq.getEmail())){
            articleRepositorySupport.updateArticle(articleUpdatePutReq);
            return;
        } else {
            throw new Exception("글 작성자와 수정하려는 자가 다릅니다");
        }
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
