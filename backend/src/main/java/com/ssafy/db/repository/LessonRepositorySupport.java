package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.QAuth;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

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
    QOpenLesson qOpenLesson = QOpenLesson.openLesson;
    QPamphlet qPamplet = QPamphlet.pamphlet;

    QUser qUser = QUser.user;
    QReview qReview = QReview.review;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Lesson lesson){
        em.persist(lesson);
    }
    public void save(OpenLesson openLesson){
        em.persist(openLesson);
    }


    public List<Lesson> findLessonListByUserId(User user) {
        List<Lesson> lessons = jpaQueryFactory
                            .selectFrom(qLesson)
                            .where(qLesson.user.eq(user))
                            .fetch();

        return lessons;
    }

    public String findLessonProfileImg(Lesson lesson){
        return jpaQueryFactory
                .select(qPamplet.img)
                .from(qPamplet)
                .where(qPamplet.lesson.eq(lesson))
                .orderBy(qPamplet.lesson.id.asc())
                .limit(1)
                .fetchOne();
    }

    public double setLessonAvgScore(Lesson lesson) {
        double avgScore = 0l;
        try {
            avgScore = jpaQueryFactory
                    .select(qReview.score.avg())
                    .from(qReview)
                    .where(qReview.lesson.eq(lesson))
                    .fetchOne();
        } catch (Exception e){
            System.out.println(e.getStackTrace());
        }

        return avgScore;
    }
}
