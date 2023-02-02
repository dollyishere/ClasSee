package com.ssafy.api.service;

import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepositorySupport;
import com.ssafy.db.repository.OrdersRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrdersServiceImpl implements OrdersService{

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    OrdersRepositorySupport ordersRepositorySupport;

    @Autowired
    LessonRepositorySupport lessonRepositorySupport;

    @Override
    public OrdersInfoGetRes readOrders(String email, Long id) {

        OpenLesson openLesson = ordersRepositorySupport.findOneOpenLesson(id);
        Lesson lesson = ordersRepositorySupport.findOneLesson(openLesson.getLessonId());

        Long user_id = userRepositorySupport.findId(email);
        User user = userRepositorySupport.findOne(user_id);

        String lesson_img = lessonRepositorySupport.findLessonProfileImg(lesson);

        OrdersInfoGetRes ordersInfoGetRes = new OrdersInfoGetRes(openLesson, lesson, user);
        ordersInfoGetRes.setLesson_img(lesson_img);

        return ordersInfoGetRes;
    }
}
