package com.ssafy.api.response;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("OrdersInfoGetRes")
@NoArgsConstructor
public class OrdersInfoGetRes {

    String lessonImg;

    String lessonName;

    String lessonTeacherName;

    LocalDateTime lessonStartTime;

    String userName;

    String userNickname;

    String userPhone;

    String userEmail;

    String userAddress;

    Long userPoint;

    Long lessonPrice;

    Long kitPrice;

    Integer statusCode;

    String message;

    public OrdersInfoGetRes(OpenLesson openLesson, Lesson lesson, User user){

        this.lessonName = lesson.getName();
        this.lessonTeacherName = lesson.getUser().getName();
        this.lessonStartTime = openLesson.getStartTime();
        this.userName = user.getName();
        this.userNickname = user.getNickname();
        this.userPhone = user.getPhone();
        this.userEmail = user.getAuth().getEmail();
        this.userAddress = user.getAddress();
        this.userPoint = user.getPoint();
        this.lessonPrice = lesson.getPrice();
        this.kitPrice = lesson.getKitPrice();

    }
}
