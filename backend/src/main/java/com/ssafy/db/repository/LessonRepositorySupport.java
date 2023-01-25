package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.QLesson;
import com.ssafy.db.entity.user.QAuth;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

/**
 * 강의 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
@RequiredArgsConstructor
@Transactional
public class LessonRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QLesson qLesson = QLesson.lesson;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Lesson lesson){
        em.persist(lesson);
    }
}
