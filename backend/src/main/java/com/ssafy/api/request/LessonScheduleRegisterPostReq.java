package com.ssafy.api.request;

import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;

@Getter
@Setter
@ApiModel("LessonScheduleRegisterPostReq")
public class LessonScheduleRegisterPostReq {
    @ApiModelProperty(name="lesson_id", example="강의 아이디")
    Long lessonId;
    @ApiModelProperty(name="start_time", example="강의 시작 시간")
    String startTime;
    @ApiModelProperty(name="end_time", example="강의 종료 시간")
    String endTime;

    public OpenLesson getOpenLessonInfoFromReq(LessonScheduleRegisterPostReq requestInfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startTime = LocalDateTime.parse(requestInfo.getStartTime(), formatter);
        LocalDateTime endTime = LocalDateTime.parse(requestInfo.getEndTime(), formatter);
        OpenLesson openLesson = OpenLesson.builder()
                .lessonId(requestInfo.lessonId)
                .startTime(startTime).endTime(endTime)
                .build();

        return openLesson;
    }
}
