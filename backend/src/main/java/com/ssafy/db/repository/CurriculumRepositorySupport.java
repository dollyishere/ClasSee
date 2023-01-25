package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Curriculum;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.QLesson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class CurriculumRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QLesson qLesson = QLesson.lesson;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Curriculum curriculum){
        em.persist(curriculum);
    }
}