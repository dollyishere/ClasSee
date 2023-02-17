package com.ssafy.db.repository;

import com.fasterxml.jackson.databind.util.ArrayBuilders;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.dto.LessonSearchFilterDto;
import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.orders.QOrders;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    QOrders qOrders = QOrders.orders;
    QPamphlet qPamplet = QPamphlet.pamphlet;
    QCurriculum qCurriculum = QCurriculum.curriculum;

    QUser qUser = QUser.user;
    QReview qReview = QReview.review;

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

    public List<OpenLesson> findScheduleByLessonId(Long lessonId, LocalDate regTime) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qOpenLesson.lessonId.eq(lessonId));
        if(regTime != null) {
            builder.and(qOpenLesson.startTime.month().eq(regTime.getMonth().getValue()));
            builder.and(qOpenLesson.startTime.dayOfMonth().eq(regTime.getDayOfMonth()));

        }
        List<OpenLesson> schedules = jpaQueryFactory
                .selectFrom(qOpenLesson)
                .where(builder)
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

    public HashMap<String, Object> findAttendLessonListByStudent(Long userId, String query, int limit, int offset) {
        HashMap<String, Object> res = new HashMap<>();
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qOpenLesson.id.eq(qOrders.openLesson.id));
        builder.and(qOrders.user.id.eq(userId));

        if(query.toUpperCase().equals("DONE")) builder.and(qOpenLesson.startTime.before(LocalDateTime.now()));
        if(query.toUpperCase().equals("TODO")) builder.and(qOpenLesson.startTime.after(LocalDateTime.now()));

        Long count = jpaQueryFactory
                .select(qOpenLesson.count())
                .from(qOpenLesson, qOrders)
                .where(builder)
                .orderBy(qOpenLesson.startTime.asc())
                .fetchOne();

        List<OpenLesson> lessons = jpaQueryFactory
                .select(qOpenLesson)
                .from(qOpenLesson, qOrders)
                .where(builder)
                .orderBy(qOpenLesson.startTime.asc())
                .offset(offset)
                .limit(limit)
                .fetch();

        res.put("LESSON_LIST", lessons);
        res.put("COUNT", count);
        return res;
    }

    public HashMap<String, Object> findAttendLessonListByTeacher(Long userId, int limit, int offset) {
        HashMap<String, Object> res = new HashMap<>();
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qLesson.user.auth.id.eq(userId));

        // 최근 생성 순
        List<Lesson> lessonList = jpaQueryFactory
                .selectFrom(qLesson)
                .where(builder)
                .orderBy(qLesson.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();

        Long count = jpaQueryFactory
                .select(qLesson.count())
                .from(qLesson)
                .where(builder)
                .fetchOne();

        res.put("LESSON_LIST", lessonList);
        res.put("COUNT", count);
        return res;
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

    public Map<String, Object> findLessonListByFilter(LessonSearchFilterDto requestInfo, int offset, int limit) {
        Map<String, Object> result = new HashMap<>();
        // requestinfo ( (min, max) startTime, price, dayofweek, category )
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qLesson.user.auth.id.isNotNull());
//        builder.and(qLesson.id.eq(qOpenLesson.lessonId));
        if(requestInfo.getKeyword() != null) builder.and(qLesson.name.contains(requestInfo.getKeyword()));
        if(requestInfo.getCategory() != null) builder.and(qLesson.category.eq(requestInfo.getCategory()));
        if(requestInfo.getMinPrice() != null) builder.and(qLesson.price.goe(requestInfo.getMinPrice()));
        if(requestInfo.getMaxPrice() != null) builder.and(qLesson.price.loe(requestInfo.getMaxPrice()));
        if(requestInfo.getMinStartTime() != null) builder.and(qOpenLesson.startTime.hour().goe(requestInfo.getMinStartTime()));
        if(requestInfo.getMaxStartTime() != null) builder.and(qOpenLesson.startTime.hour().loe(requestInfo.getMaxStartTime()));
        if(requestInfo.getDayOfWeek() != null) {
            String[] reqDays = requestInfo.getDayOfWeek().split(",");
            List<Integer> parseDays = new ArrayList<>();
            Arrays.stream(reqDays).forEach((day) -> {
                parseDays.add(
                        Integer.parseInt(day)
                );
            });
            // 1(SUN) ~ 7(SAT)
            builder.and(qOpenLesson.startTime.dayOfWeek().in(parseDays.toArray(new Integer[0])));
        }

        List<Lesson> lessonList = jpaQueryFactory
                .select(qLesson).distinct()
                .from(qLesson)
                .leftJoin(qLesson.openLessonList, qOpenLesson)
                .where(builder)
                .orderBy(qLesson.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();

        Long count = jpaQueryFactory
                .select(qLesson.countDistinct())
                .from(qLesson)
                .leftJoin(qLesson.openLessonList, qOpenLesson)
                .where(builder)
                .fetchOne();


        result.put("LESSON_LIST", lessonList);
        result.put("COUNT", count);

        return result;
    }

    public Long existsUserInLesson(Long lessonId) {
        Long cnt = jpaQueryFactory
                .select(qLesson.count())
                .from(qLesson, qOpenLesson, qOrders)
                .where(
                        qLesson.id.eq(qOpenLesson.lessonId),
                        qOrders.openLesson.lessonId.eq(lessonId),
                        qLesson.id.eq(lessonId)
                )
                .fetchOne();

        return cnt;
    }

    public void deleteOpenLessonByLessonId(Long lessonId) {
        jpaQueryFactory
                .delete(qOpenLesson)
                .where(qOpenLesson.lessonId.eq(lessonId))
                .execute();
    }

    public void deleteOpenLesson(Long openLessonId) {
        jpaQueryFactory
                .delete(qOpenLesson)
                .where(qOpenLesson.id.eq(openLessonId))
                .execute();
    }

    public Long existsUserInOpenLesson(Long openLessonId) {
        return jpaQueryFactory
                .select(qOrders.count())
                .from(qOrders)
                .where(qOrders.openLesson.id.eq(openLessonId))
                .fetchOne();
    }

    public Long findAttendCount(Long id) {
        return jpaQueryFactory
                .select(qOrders.id.count())
                .from(qOrders)
                .where(qOrders.openLesson.id.eq(id))
                .fetchOne();
    }
}
