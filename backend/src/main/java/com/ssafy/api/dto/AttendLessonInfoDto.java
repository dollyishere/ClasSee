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
    Long openLessonid; // 레슨 아이디
    String name;
    Long runningtime;
    String category;
    String img;
    double score;
    boolean isBookmarked;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime endTime;
}
