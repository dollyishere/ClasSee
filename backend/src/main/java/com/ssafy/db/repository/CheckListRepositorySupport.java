package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Checklist;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.QChecklist;
import com.ssafy.db.entity.lesson.QLesson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class CheckListRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;
    QChecklist qChecklist = QChecklist.checklist;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Checklist checkList){
        em.persist(checkList);
    }

    public void update(Checklist checklist) {
        jpaQueryFactory.
                update(qChecklist)
                .where(qChecklist.id.eq(checklist.getId()))
                .set(qChecklist.img, checklist.getImg())
                .execute();

        em.clear();
        em.flush();
    }
}
