package com.ssafy.api.request;

import com.ssafy.db.entity.lesson.Checklist;
import com.ssafy.db.entity.lesson.Curriculum;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.entity.user.UserType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("NoticeCreatePostRequest")
public class LessonRegisterPostReq {
    @ApiModelProperty(name="name", example="강의명")
    String name;
    @ApiModelProperty(name="description", example="강의 소개")
    String description;
    @ApiModelProperty(name="runningtime", example="강의 소요 시간")
    Long runningtime;
    @ApiModelProperty(name="maximum", example="강의 수강 인원")
    Long maximum;

    @ApiModelProperty(name="price", example="수강료")
    Long price;

    @ApiModelProperty(name="checklist", example="준비물")
    List<Checklist> checkList;

    @ApiModelProperty(name="curriculum", example="커리큘럼")
    List<Curriculum> curriculumList;

    public Map<String, Object> getLessonInfoFromReq() {
        Map<String, Object> lessonInfo = new HashMap<>();

        Lesson lesson = new Lesson().builder()
                .name(name)
                .description(description)
                .maximum(maximum)
                .runningtime(runningtime)
                .price(price)
                .build();

        List<Checklist> checklists = this.checkList;
        List<Curriculum> curriculums = this.curriculumList;

        lessonInfo.put("LESSON", lesson);
        lessonInfo.put("CHECKLISTS", checklists);
        lessonInfo.put("CURRICULUMS", curriculums);
        return lessonInfo;
    }
}
