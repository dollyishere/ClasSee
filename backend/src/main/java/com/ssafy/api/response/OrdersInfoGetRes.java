package com.ssafy.api.response;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("OrdersInfoGetRes")
public class OrdersInfoGetRes {

    String lesson_img;

    String lesson_name;

    String lesson_teacherName;

    LocalDateTime lesson_startTime;

    String user_name;

    String user_nickname;

    String user_phone;

    String user_email;

    String user_address;

    Long lesson_price;

    Long kit_price;

    public OrdersInfoGetRes(OpenLesson openLesson, Lesson lesson, User user){

        this.lesson_name = lesson.getName();
        this.lesson_teacherName = lesson.getUser().getName();
        this.lesson_startTime = openLesson.getStartTime();
        this.user_name = user.getName();
        this.user_nickname = user.getNickname();
        this.user_phone = user.getPhone();
        this.user_email = user.getAuth().getEmail();
        this.user_address = user.getAddress();
        this.lesson_price = lesson.getPrice();
        this.kit_price = lesson.getKitPrice();

    }
}
