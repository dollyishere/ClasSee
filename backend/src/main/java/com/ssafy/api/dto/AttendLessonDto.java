package com.ssafy.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class AttendLessonDto {
    Long lessonId;
    Long openLessonId;

    String img;
    String kitDescription;
    Long price;
    Long kitPrice;
}
