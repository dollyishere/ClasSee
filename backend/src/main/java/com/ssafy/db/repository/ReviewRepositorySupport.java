package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.request.ReviewUpdatePutReq;
import com.ssafy.db.entity.lesson.QLesson;
import com.ssafy.db.entity.lesson.QReview;
import com.ssafy.db.entity.lesson.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QReview qReview = QReview.review;

    QLesson qLesson = QLesson.lesson;

    public void save(Review review) { em.persist(review); }

    public void delete(Review review) { em.remove(review); }

    public Review findOne(Long id) { return em.find(Review.class, id); }

    public Review findOne(Long user_id, Long lesson_id){
        Review review = jpaQueryFactory
                .selectFrom(qReview)
                .where(qReview.user.id.eq(user_id), qReview.lesson.id.eq(lesson_id))
                .fetchOne();

        return review;
    }

    public Long countReview(Long lesson_id){
        return jpaQueryFactory
                .select(qReview.count())
                .from(qReview)
                .where(qReview.lesson.id.eq(lesson_id))
                .fetchOne();
    }

    public Long countMyReview(Long user_id){
        return jpaQueryFactory
                .select(qReview.count())
                .from(qReview)
                .where(qReview.user.id.eq(user_id))
                .fetchOne();
    }

    public List<Review> findList(Long lesson_id, int offset, int limit){
        return jpaQueryFactory
                .select(qReview)
                .from(qReview)
                .where(qReview.lesson.id.eq(lesson_id))
                .orderBy(qReview.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Review> findMyList(Long user_id, int offset, int limit){
        return jpaQueryFactory
                .select(qReview)
                .from(qReview)
                .where(qReview.user.id.eq(user_id))
                .orderBy(qReview.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public void updateReview(ReviewUpdatePutReq reviewUpdatePutReq){
        jpaQueryFactory
                .update(qReview)
                .where(qReview.id.eq(reviewUpdatePutReq.getId()))
                .set(qReview.content, reviewUpdatePutReq.getContent())
                .set(qReview.img, reviewUpdatePutReq.getImg())
                .set(qReview.score, reviewUpdatePutReq.getScore())
                .execute();

        em.clear();
        em.flush();
    }



}
