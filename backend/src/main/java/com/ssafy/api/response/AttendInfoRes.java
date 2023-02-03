package com.ssafy.api.response;


import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@ApiModel("AttendInfoResponse")
public class AttendInfoRes {
    Long openLessonId;
    LocalDateTime startTime;
    String lessonImg;

}
