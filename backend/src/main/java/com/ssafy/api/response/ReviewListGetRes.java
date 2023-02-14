package com.ssafy.api.response;

import com.ssafy.db.entity.lesson.Review;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ApiModel("ReviewListGetRes")
public class ReviewListGetRes {

    Long id;
    String content;
    String regtime;
    String img;
    Long score;
    String userEmail;
    String userNickname;
    String userImg;
    Long lessonId;
    String lessonName;

    public ReviewListGetRes(Review review){

        this.userEmail = review.getUser().getAuth().getEmail();
        this.id = review.getId();
        this.content = review.getContent();
        if(review.getRegtime() != null){
            this.regtime = review.getRegtime().toString();
        }
        this.img = review.getImg();
        this.score = review.getScore();
        this.userNickname = review.getUser().getNickname();
        this.userImg = review.getUser().getImg();
        this.lessonId = review.getLesson().getId();
        this.lessonName = review.getLesson().getName();

    }


}
