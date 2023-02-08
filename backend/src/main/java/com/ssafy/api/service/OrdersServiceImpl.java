package com.ssafy.api.service;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.orders.Orders;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepositorySupport;
import com.ssafy.db.repository.OrdersRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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
        ordersInfoGetRes.setLessonImg(lesson_img);

        return ordersInfoGetRes;
    }

    @Override
    public void createOrders(OrdersRegistPostReq ordersRegistPostReq) throws Exception {

        Long user_id = userRepositorySupport.findId(ordersRegistPostReq.getEmail());
        User user = userRepositorySupport.findOne(user_id);
        Long user_point = user.getPoint();

        OpenLesson openLesson = ordersRepositorySupport.findOneOpenLesson(ordersRegistPostReq.getOpenLessonId());
        Lesson lesson = ordersRepositorySupport.findOneLesson(openLesson.getLessonId());

        Long teacher_id = lesson.getUser().getId();
        User teacher = userRepositorySupport.findOne(teacher_id);

        if(user_point >= ordersRegistPostReq.getPrice()) {
            Orders orders = Orders.builder()
                    .regTime(LocalDateTime.now())
                    .phone(ordersRegistPostReq.getPhone())
                    .email(ordersRegistPostReq.getEmail())
                    .address(user.getAddress())
                    .price(ordersRegistPostReq.getPrice())
                    .user(user)
                    .openLesson(openLesson)
                    .build();

            user.setPoint(user_point - ordersRegistPostReq.getPrice());
            teacher.setPoint(teacher.getPoint() + ordersRegistPostReq.getPrice());
            userRepositorySupport.save(user);
            ordersRepositorySupport.save(orders);
        } else {
            throw new Exception("포인트가 부족합니다");
        }

        return;
    }

    @Override
    public void chargePoint(String email, Long point) {

        Long user_id = userRepositorySupport.findId(email);
        ordersRepositorySupport.updatePoint(user_id, point);

        return;

    }

    @Override
    public void deleteOrders(Long ordersId) {
        ordersRepositorySupport.deleteOrders(ordersId);
    }


}
