package com.ssafy.api.response;

import com.ssafy.api.dto.OpenLessonInfoDto;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ApiModel("LessonSchedulesResponse")
public class LessonSchedulsRes extends BaseResponseBody {
    List<OpenLessonInfoDto> lessonScheduls;

    public static LessonSchedulsRes of(Integer statusCode, String message, LessonSchedulsRes lessonSchedulsRes) {
        LessonSchedulsRes res = new LessonSchedulsRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLessonScheduls(lessonSchedulsRes.getLessonScheduls());
        return res;
    }
}
