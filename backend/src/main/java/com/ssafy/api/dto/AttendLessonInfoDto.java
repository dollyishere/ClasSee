package com.ssafy.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class AttendLessonInfoDto{
    Long lessonId;
    Long openLessonId; // 레슨 아이디
    String name;
    Long runningTime;
    String category;
    String lessonImage;
    String teacherImage;
    double score;
    boolean isBookMarked;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime endTime;
}
