package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Check;

import java.util.List;

/*
    강의명,
    강의 카테고리,
    강의 소요시간,
    강의 평점,
    북마크 여부,
    강의 소개,
    List<커리큘럼>,
    List<강의 팜플렛>
    List<준비물>
    List<강의 스케줄>
    강사명,
    강사 소개,
    강사 프로필 이미지
*/

@Builder
@Getter
@Setter
@ApiModel("LessonDetailsResponse")
public class LessonDetailsRes extends BaseResponseBody {
    Long lessonId;
    String teacher;
    String lessonName;
    String cklsDescription;

    String lessonDescription;
    Long price;
    Long kitPrice;
    String kitDescription;
    String category;
    Long runningTime;
    Long maximum;
    String userName;
    String userDesciption;
    String teacherImage;
    List<Curriculum> curriculums;
    List<Checklist> checkLists;
    List<Pamphlet> pamphlets;

    double score;

    boolean isBookMarked;

    boolean isAttended;

    public static LessonDetailsRes of(Integer statusCode, String message, LessonDetailsRes lessonDetailsRes) {
        lessonDetailsRes.setMessage(message);
        lessonDetailsRes.setStatusCode(statusCode);
        return lessonDetailsRes;
    }
}
