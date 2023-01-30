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

}
