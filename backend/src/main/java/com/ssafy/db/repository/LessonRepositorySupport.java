package com.ssafy.db.repository;

import com.fasterxml.jackson.databind.util.ArrayBuilders;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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
    QChecklist qChecklist = QChecklist.checklist;
    QOpenLesson qOpenLesson = QOpenLesson.openLesson;
    QPamphlet qPamplet = QPamphlet.pamphlet;
    QCurriculum qCurriculum = QCurriculum.curriculum;

    QUser qUser = QUser.user;
    QReview qReview = QReview.review;
    QSchedule qSchedule = QSchedule.schedule;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(Lesson lesson) {
        em.persist(lesson);
    }

    public void save(OpenLesson openLesson) {
        em.persist(openLesson);
    }


    public List<Lesson> findLessonListByUserId(User user) {
        List<Lesson> lessons = jpaQueryFactory
                .selectFrom(qLesson)
                .where(qLesson.user.eq(user))
                .fetch();

        return lessons;
    }

    public String findLessonProfileImg(Lesson lesson) {
        return jpaQueryFactory
                .select(qPamplet.img)
                .from(qPamplet)
                .where(qPamplet.lessonId.eq(lesson.getId()))
                .orderBy(qPamplet.lessonId.asc())
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
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }

        return avgScore;
    }

    public List<OpenLesson> findScheduleByLessonId(Long lessonId) {
        List<OpenLesson> schedules = jpaQueryFactory
                .selectFrom(qOpenLesson)
                .where(qOpenLesson.lessonId.eq(lessonId))
                .fetch();

        return schedules;
    }

    public List<Curriculum> findCurriculumByLesson(Long lessonId) {
        List<Curriculum> curriculums = jpaQueryFactory
                .selectFrom(qCurriculum)
                .where(qCurriculum.lessonId.eq(lessonId))
                .fetch();

        return curriculums;
    }

    public List<Checklist> findCheckListByLesson(Long lessonId) {
        List<Checklist> checklists = jpaQueryFactory
                .selectFrom(qChecklist)
                .where(qChecklist.lessonId.eq(lessonId))
                .fetch();

        return checklists;
    }

    public List<Pamphlet> findPamphletByLesson(Long lessonId) {
        List<Pamphlet> pamphlets = jpaQueryFactory
                .selectFrom(qPamplet)
                .where(qPamplet.lessonId.eq(lessonId))
                .fetch();

        return pamphlets;
    }

    public List<OpenLesson> findAttendLessonListByStudent(Long userId, String query, int limit, int offset) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qOpenLesson.id.eq(qSchedule.openLesson.id));
        builder.and(qSchedule.user.id.eq(userId));

        if(query.toUpperCase().equals("DONE")) builder.and(qOpenLesson.startTime.before(LocalDateTime.now()));
        if(query.toUpperCase().equals("TODO")) builder.and(qOpenLesson.startTime.after(LocalDateTime.now()));

        List<OpenLesson> lessons = jpaQueryFactory
                .select(qOpenLesson)
                .from(qOpenLesson, qSchedule)
                .where(builder)
                .orderBy(qOpenLesson.startTime.asc())
                .offset(offset)
                .limit(limit)
                .fetch();
        return lessons;
    }

    public List<OpenLesson> findAttendLessonListByTeacher(Long userId, String query, int limit, int offset) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qOpenLesson.lessonId.eq(qLesson.id));
        builder.and(qLesson.user.auth.id.eq(userId));

        if(query.toUpperCase().equals("DONE")) builder.and(qOpenLesson.startTime.before(LocalDateTime.now()));
        if(query.toUpperCase().equals("TODO")) builder.and(qOpenLesson.startTime.after(LocalDateTime.now()));

        // 임박 순서
        List<OpenLesson> lessons = jpaQueryFactory
                .select(qOpenLesson)
                .from(qOpenLesson, qLesson)
                .where(builder)
                .orderBy(qOpenLesson.startTime.asc())
                .offset(offset)
                .limit(limit)
                .fetch();

        return lessons;
    }

    /*
         리뷰 테이블에서 평점이 가장 높은 12개의 강의 아이디를 반환
     */
    public List<Long> findPopularLesson() {
        List<Long> lessonList = jpaQueryFactory
                .select(qReview.lesson.id)
                .from(qReview)
                .groupBy(qReview.lesson.id)
                .orderBy(qReview.score.avg().desc())
                .limit(12)
                .fetch();

        return lessonList;
    }

    public Long update(Lesson lesson) {
        Long count = jpaQueryFactory.
                update(qLesson)
                .set(qLesson.cklsDescription, lesson.getCklsDescription())
                .set(qLesson.description, lesson.getDescription())
                .set(qLesson.kitPrice, lesson.getKitPrice())
                .set(qLesson.kitDescription, lesson.getKitDescription())
                .set(qLesson.category, lesson.getCategory())
                .set(qLesson.runningtime, lesson.getRunningtime())
                .set(qLesson.maximum, lesson.getMaximum())
                .set(qLesson.name, lesson.getName())
                .set(qLesson.price, lesson.getPrice())
                .where(qLesson.id.eq(lesson.getId()))
                .execute();
        em.clear();
        em.flush();

        return count;
    }
}
