package com.ssafy.api.service;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.common.exception.handler.*;
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
    public OrdersInfoGetRes readOrders(String email, Long id) throws Exception {

        OpenLesson openLesson = ordersRepositorySupport.findOneOpenLesson(id);

        if(openLesson == null){
            throw new OpenLessonException("openLesson not found");
        }

        Lesson lesson = ordersRepositorySupport.findOneLesson(openLesson.getLessonId());

        if(lesson == null){
            throw new LessonException("lesson not found");
        }

        if(ordersRepositorySupport.ordersCount(openLesson.getId()) >= lesson.getMaximum()){
            throw new MaximumException("exceed the maximum");
        }

        Long user_id = userRepositorySupport.findId(email);

        if(user_id == null){
            throw new UserException("user not found");
        }

        User user = userRepositorySupport.findOne(user_id);

        String lesson_img = lessonRepositorySupport.findLessonProfileImg(lesson);

        OrdersInfoGetRes ordersInfoGetRes = new OrdersInfoGetRes(openLesson, lesson, user);
        ordersInfoGetRes.setLessonImg(lesson_img);

        return ordersInfoGetRes;
    }

    @Override
    public void createOrders(OrdersRegistPostReq ordersRegistPostReq) throws Exception {

        Long user_id = userRepositorySupport.findId(ordersRegistPostReq.getEmail());

        if(user_id == null){
            throw new UserException("user not found");
        }

        User user = userRepositorySupport.findOne(user_id);
        Long user_point = user.getPoint();

        OpenLesson openLesson = ordersRepositorySupport.findOneOpenLesson(ordersRegistPostReq.getOpenLessonId());

        if(openLesson == null){
            throw new OpenLessonException("openLesson not found");
        }

        if(ordersRepositorySupport.findOne(user_id, ordersRegistPostReq.getOpenLessonId()) != null){
            throw new OrdersException("orders duplicated");
        }

        Lesson lesson = ordersRepositorySupport.findOneLesson(openLesson.getLessonId());

        if(lesson == null){
            throw new LessonException("lesson not found");
        }

        Long teacher_id = lesson.getUser().getId();

        if(teacher_id == null){
            throw new UserException("teacher not found");
        }

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
            userRepositorySupport.save(teacher);
            ordersRepositorySupport.save(orders);
        } else {
            throw new Exception("포인트가 부족합니다");
        }

        return;
    }

    @Override
    public void chargePoint(String email, Long point) throws UserException {

        Long user_id = userRepositorySupport.findId(email);

        if(user_id == null){
            throw new UserException("user not found");
        }

        ordersRepositorySupport.updatePoint(user_id, point);

        return;

    }

    @Override
    public void deleteOrders(String email, Long openLessonId) throws Exception {

        Long user_id = ordersRepositorySupport.findUserId(email);

        if(user_id == null){
            throw new UserException("user not found");
        }

        Orders orders = ordersRepositorySupport.findOne(user_id, openLessonId);

        if(orders == null){
            throw new OrdersException("orders not found");
        }

        ordersRepositorySupport.delete(orders);

    }


}
