package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.board.Article;
import com.ssafy.db.entity.board.Notice;
import com.ssafy.db.entity.board.QArticle;
import com.ssafy.db.entity.board.QComment;
import com.ssafy.db.entity.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ArticleRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QArticle qArticle = QArticle.article;
    QUser qUser = QUser.user;

    public void save(Article article) {em.persist(article);}
    public void delete(Article article) {em.remove(article);}

    public Article findOne(Long id) { return em.find(Article.class, id); }

    public List<Article> findAll() {
        return jpaQueryFactory
                .select(qArticle)
                .from(qArticle)
                .fetch();
    }

    public List<Article> findList(int offset, int limit) {
        return jpaQueryFactory
                .selectFrom(qArticle)
                .orderBy(qArticle.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public Long articleCount(){
        return jpaQueryFactory
                .select(qArticle.count())
                .from(qArticle)
                .fetchOne();
    }


    public void updateHit(Long id) {

        jpaQueryFactory
                .update(qArticle)
                .where(qArticle.id.eq(id))
                .set(qArticle.hit, qArticle.hit.add(1))
                .execute();

        em.clear();
        em.flush();
    }

}
