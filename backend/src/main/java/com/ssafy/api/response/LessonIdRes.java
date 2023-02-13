package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ApiModel("LessonIdRes")
public class LessonIdRes extends BaseResponseBody {
    Long lessonId;

    public static LessonIdRes of(Integer statusCode, String message, Long lessonId) {
        LessonIdRes res = new LessonIdRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLessonId(lessonId);
        return res;
    }
}
