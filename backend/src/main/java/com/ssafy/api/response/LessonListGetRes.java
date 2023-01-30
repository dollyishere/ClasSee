package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.lesson.Category;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
/*
- 강의명
- 소요시간
- 카테고리
- 이미지
- 별점 평균
*/
@Builder
@Getter
@Setter
@ApiModel("LessonListGetResponse")
public class LessonListGetRes extends BaseResponseBody {
    Long id; // 레슨 아이디
    String name;
    Long runningtime;
    Category category;
    String img;
    double score;

    boolean isBookmarked;

    public static LessonListGetRes of(Integer statusCode, String message, LessonListGetRes lessonListGetRes) {
        lessonListGetRes.setMessage(message);
        lessonListGetRes.setStatusCode(statusCode);
        lessonListGetRes.setId(lessonListGetRes.getId());
        lessonListGetRes.setName(lessonListGetRes.getName());
        lessonListGetRes.setRunningtime(lessonListGetRes.getRunningtime());
        lessonListGetRes.setCategory(lessonListGetRes.getCategory());
        lessonListGetRes.setImg(lessonListGetRes.getImg());
        lessonListGetRes.setScore(lessonListGetRes.getScore());
        lessonListGetRes.setBookmarked(lessonListGetRes.isBookmarked());
        return lessonListGetRes;
    }
}
