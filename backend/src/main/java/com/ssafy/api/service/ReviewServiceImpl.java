package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistPostReq;
import com.ssafy.api.request.ReviewUpdatePutReq;
import com.ssafy.common.exception.handler.LessonException;
import com.ssafy.common.exception.handler.OpenLessonException;
import com.ssafy.common.exception.handler.ReviewException;
import com.ssafy.common.exception.handler.UserException;
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

import java.sql.Timestamp;
import java.time.LocalDateTime;
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
    public Long createReview(ReviewRegistPostReq reviewRegistPostReq) throws Exception {

        Long user_id = userRepositorySupport
                .findId(reviewRegistPostReq.getUserEmail());

        if(user_id == null){
            throw new UserException("USER NOT FOUND");
        }

        User user = userRepositorySupport
                .findOne(user_id);

        Lesson lesson = ordersRepositorySupport
                .findOneLesson(reviewRegistPostReq.getLessonId());

        if (lesson == null){
            throw new LessonException("LESSON NOT FOUND");
        }

        Review review = Review.builder()
                .content(reviewRegistPostReq.getContent())
                .regtime(Timestamp.valueOf(LocalDateTime.now()))
                .img(reviewRegistPostReq.getImg())
                .score(reviewRegistPostReq.getScore())
                .user(user)
                .lesson(lesson)
                .build();

        reviewRepositorySupport.save(review);

        return review.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> readReview(Long lesson_id, int offset, int limit) throws LessonException {

        Lesson lesson = ordersRepositorySupport.findOneLesson(lesson_id);

        if(lesson == null){
            throw new LessonException("Lesson not found");
        }

        return reviewRepositorySupport
                .findList(lesson_id, offset, limit);

    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> readMyReview(String email, int offset, int limit) throws UserException {
        Long user_id = userRepositorySupport.findId(email);

        if(user_id == null){
            throw new UserException("user not found");
        }

        return reviewRepositorySupport
                .findMyList(user_id, offset, limit);

    }

    @Override
    @Transactional(readOnly = true)
    public Long countReview(Long lesson_id) {
        return reviewRepositorySupport.countReview(lesson_id);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countMyReview(String email) {
        Long user_id = userRepositorySupport.findId(email);

        return reviewRepositorySupport.countMyReview(user_id);
    }

    @Override
    public void updateReview(ReviewUpdatePutReq reviewUpdatePutReq) throws ReviewException {

        Review review = reviewRepositorySupport.findOne(reviewUpdatePutReq.getId());

        if(review == null){
            throw new ReviewException("review not found");
        }

        reviewRepositorySupport
                .updateReview(reviewUpdatePutReq);

        return;
    }

    @Override
    public void deleteReview(Long id) throws ReviewException {

        Review review = reviewRepositorySupport.findOne(id);

        if(review == null){
            throw new ReviewException("review not found");
        }
        reviewRepositorySupport.delete(review);

        return;
    }
}
