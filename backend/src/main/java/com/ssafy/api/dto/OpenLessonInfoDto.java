package com.ssafy.api.dto;

import com.ssafy.api.response.UserEmailCheckGetRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.lesson.OpenLesson;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class OpenLessonInfoDto {
    Long openLessonId;
    Long lessonId;
    Long totalCount;
    Long attendCount;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime endTime;

}
