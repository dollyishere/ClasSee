package com.ssafy.api.response;

import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ApiModel("AttendLessonInfoListResponse")
public class AttendLessonInfoListRes extends BaseResponseBody {
    List<? extends AttendLessonInfoDto> lessonInfoList;

    Long count;

    public static AttendLessonInfoListRes of(Integer statusCode, String message, AttendLessonInfoListRes attendLessonInfoListRes) {
        AttendLessonInfoListRes res = new AttendLessonInfoListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLessonInfoList(attendLessonInfoListRes.getLessonInfoList());
        res.setCount(attendLessonInfoListRes.getCount());
        return res;
    }
}
