package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistPostReq;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.lesson.Review;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.OrdersRepositorySupport;
import com.ssafy.db.repository.ReviewRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepositorySupport reviewRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    OrdersRepositorySupport ordersRepositorySupport;

    @Override
    public void createReview(ReviewRegistPostReq reviewRegistPostReq) {

        Long user_id = userRepositorySupport
                .findId(reviewRegistPostReq.getUser_email());

        User user = userRepositorySupport
                .findOne(user_id);

        OpenLesson openLesson = ordersRepositorySupport
                .findOneOpenLesson(reviewRegistPostReq.getOpenLesson_id());

        Lesson lesson = ordersRepositorySupport
                .findOneLesson(openLesson.getLessonId());

        Review review = Review.builder()
                .title(reviewRegistPostReq.getTitle())
                .content(reviewRegistPostReq.getContent())
                .img(reviewRegistPostReq.getImg())
                .score(reviewRegistPostReq.getScore())
                .user(user)
                .lesson(lesson)
                .build();

        reviewRepositorySupport.save(review);

        return;

    }

    @Override
    public List<Review> readReview(Long lesson_id, int offset, int limit) {

        return reviewRepositorySupport
                .findList(lesson_id, offset, limit);

    }

    @Override
    public Long countReview() {
        return reviewRepositorySupport.reviewCount();
    }

    @Override
    public void updateReview() {

    }

    @Override
    public void deleteReview(Long id) {

        Review review = reviewRepositorySupport.findOne(id);
        reviewRepositorySupport.delete(review);

        return;
    }
}
