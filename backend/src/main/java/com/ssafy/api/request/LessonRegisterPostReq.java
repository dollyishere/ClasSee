package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.lesson.Checklist;
import com.ssafy.db.entity.lesson.Curriculum;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.Pamphlet;
import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.entity.user.UserType;
import com.ssafy.db.repository.UserRepositorySupport;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("LessonRegisterPostReq")
public class LessonRegisterPostReq {
    @ApiModelProperty(name="email", example="강사 이메일")
    String email;
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

    @ApiModelProperty(name="checklist", example="준비물(img[string]) 리스트")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    List<Checklist> checkList;

    @ApiModelProperty(name="pamphlet", example="강의 소개 사진(img[string]) 리스트")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    List<Pamphlet> pamphletList;
    @ApiModelProperty(name="curriculum", example="커리큘럼(stage[int], description[string]) 리스트")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    List<Curriculum> curriculumList;


    public Map<String, Object> getLessonInfoFromReq(User user) {
        Map<String, Object> lessonInfo = new HashMap<>();

        Lesson lesson = new Lesson().builder()
                .name(name)
                .description(description)
                .maximum(maximum)
                .runningtime(runningtime)
                .price(price)
                .user(user)
                .build();

        List<Checklist> checklists = this.checkList;
        List<Pamphlet> pamphlets = this.pamphletList;
        List<Curriculum> curriculums = this.curriculumList;

        lessonInfo.put("LESSON", lesson);
        lessonInfo.put("CHECKLISTS", checklists);
        lessonInfo.put("PAMPHLET", pamphlets);
        lessonInfo.put("CURRICULUMS", curriculums);
        return lessonInfo;
    }
}
