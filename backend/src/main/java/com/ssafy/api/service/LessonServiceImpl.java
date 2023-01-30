package com.ssafy.api.service;

import com.ssafy.api.request.LessonScheduleRegisterPostReq;
import com.ssafy.api.response.LessonListGetRes;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.repository.CheckListRepositorySupport;
import com.ssafy.db.repository.CurriculumRepositorySupport;
import com.ssafy.db.repository.LessonRepositorySupport;
import com.ssafy.db.repository.PamphletRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class LessonServiceImpl implements LessonService{
    @Autowired
    LessonRepositorySupport lessonRepositorySupport;
    @Autowired
    CheckListRepositorySupport checkListRepositorySupport;
    @Autowired
    CurriculumRepositorySupport curriculumRepositorySupport;

    @Autowired
    PamphletRepositorySupport pamphletRepositorySupport;
    @Override
    public void createLesson(Map<String, Object> lessonInfo) {
        /*
         lessonInfo("LESSON":레슨정보, "CHECKLISTS":준비물정보, "CURRICULUMS": 커리큘럼정보);
         각각의 KEY를 통해 객체 생성 후, DB에 데이터 삽입
        */
        Lesson lesson = (Lesson) lessonInfo.get("LESSON");
        List<Checklist> checkLists = (List<Checklist>)lessonInfo.get("CHECKLISTS");
        List<Curriculum> curriculums = (List<Curriculum>)lessonInfo.get("CURRICULUMS");
        List<Pamphlet> pamphlets = (List<Pamphlet>)lessonInfo.get("PAMPHLET");

        lessonRepositorySupport.save(lesson);

        checkLists.forEach((checklist) -> {
            checklist.setLesson(lesson);
            checkListRepositorySupport.save(checklist);
        });

        curriculums.forEach((curriculum) -> {
            curriculum.setLesson(lesson);
            curriculumRepositorySupport.save(curriculum);
        });

        pamphlets.forEach((pamphlet) -> {
            pamphlet.setLesson(lesson);
            pamphletRepositorySupport.save(pamphlet);
        });
    }

    @Override
    public List<LessonListGetRes> setLessonProfileImgAndScore(List<Lesson> lessonList) {
        List<LessonListGetRes> getLessonList = new ArrayList<>();
        // 강의 목록에 대표 이미지랑, 별점 평균 세팅해주기
        lessonList.forEach((lesson) -> {
            // 대표 이미지
            LessonListGetRes lessonRes = LessonListGetRes.builder()
                    .id(lesson.getId())
                    .name(lesson.getName())
                    .category(lesson.getCategory())
                    .runningtime(lesson.getRunningtime())
                    .build();

            lessonRes.setImg(
                    lessonRepositorySupport.findLessonProfileImg(lesson)
            );

            lessonRes.setScore(
                    lessonRepositorySupport.setLessonAvgScore(lesson)
            );

            getLessonList.add(lessonRes);
        });

        return getLessonList;
    }

    @Override
    public void createSchedule(OpenLesson requestInfo) throws Exception{
        lessonRepositorySupport.save(requestInfo);
    }
}
