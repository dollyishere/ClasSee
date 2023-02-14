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
    String year;
    String month;
    String day;
    String time;
    String img;
    Long score;
    String userEmail;
    String userNickname;
    String userImg;
    Long lessonId;
    String lessonName;

    public ReviewListGetRes(Review review){

        if(review.getRegtime() != null){

            Timestamp regtime = review.getRegtime();

            DateTimeFormatter yearFormatter = DateTimeFormatter.ofPattern("yyyy");
            String year = regtime.toLocalDateTime().format(yearFormatter);

            DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MM");
            String month = regtime.toLocalDateTime().format(monthFormatter);

            DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("dd");
            String day = regtime.toLocalDateTime().format(dayFormatter);

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            String time = regtime.toLocalDateTime().format(timeFormatter);

            this.year = year;
            this.month = month;
            this.day = day;
            this.time = time;
        }

        this.userEmail = review.getUser().getAuth().getEmail();
        this.id = review.getId();
        this.content = review.getContent();
        this.img = review.getImg();
        this.score = review.getScore();
        this.userNickname = review.getUser().getNickname();
        this.userImg = review.getUser().getImg();
        this.lessonId = review.getLesson().getId();
        this.lessonName = review.getLesson().getName();

    }


}
