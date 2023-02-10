package com.ssafy.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
public class AttendLessonInfoDto{
    Long lessonId;
    String name;
    Long runningTime;
    String category;
    String lessonImage;
    String teacherImage;
    double score;
    boolean isBookMarked;
}
