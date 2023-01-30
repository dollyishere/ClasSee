package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.qna.QQna;
import com.ssafy.db.entity.qna.Qna;
import com.ssafy.db.entity.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QnaRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QQna qQna = QQna.qna;
    QUser qUser = QUser.user;

    public void save(Qna qna){ em.persist(qna); }

    public void delete(Qna qna){ em.remove(qna); }

    public Qna findOne(Long id){ return em.find(Qna.class, id);}

    public List<Qna> findAll(){
        return jpaQueryFactory
                .select(qQna)
                .from(qQna)
                .fetch();
    }

    public List<Qna> findList(int offset, int limit){
        return jpaQueryFactory
                .selectFrom(qQna)
                .orderBy(qQna.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public Long QnaCount(){
        return jpaQueryFactory
                .select(qQna.count())
                .from(qQna)
                .fetchOne();
    }



}
