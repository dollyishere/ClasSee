package com.ssafy.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
public class AttendOpenLessonInfoDto extends AttendLessonInfoDto {
    Long openLessonId; // 레슨 아이디
    String startTime;
    String endTime;
}
