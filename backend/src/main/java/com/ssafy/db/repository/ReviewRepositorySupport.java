package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.QLesson;
import com.ssafy.db.entity.lesson.QReview;
import com.ssafy.db.entity.lesson.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class ReviewRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QReview qReview = QReview.review;

    QLesson qLesson = QLesson.lesson;

    public void save(Review review) { em.persist(review); }

    public void delete(Review review) { em.remove(review); }



}
