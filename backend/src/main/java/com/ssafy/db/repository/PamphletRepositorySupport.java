package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class PamphletRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;
    QPamphlet qPamphlet = QPamphlet.pamphlet;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Pamphlet pamphlet){
        em.persist(pamphlet);
    }

    public void update(Pamphlet pamphlet) {
        jpaQueryFactory.
                update(qPamphlet)
                .where(qPamphlet.id.eq(pamphlet.getId()))
                .set(qPamphlet.img, pamphlet.getImg())
                .execute();

        em.clear();
        em.flush();
    }

    public void delete(Long lessonId) {
        jpaQueryFactory.delete(qPamphlet).where(qPamphlet.lessonId.eq(lessonId));
    }
}
