package com.ssafy.api.service;

import com.ssafy.db.entity.lesson.Checklist;
import com.ssafy.db.entity.lesson.Curriculum;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.repository.CheckListRepositorySupport;
import com.ssafy.db.repository.CurriculumRepositorySupport;
import com.ssafy.db.repository.LessonRepository;
import com.ssafy.db.repository.LessonRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LessonServiceImpl implements LessonService{
    @Autowired
    LessonRepositorySupport lessonRepositorySupport;
    @Autowired
    CheckListRepositorySupport checkListRepositorySupport;
    @Autowired
    CurriculumRepositorySupport curriculumRepositorySupport;
    @Override
    public void createLesson(Map<String, Object> lessonInfo) {
        /*
         lessonInfo("LESSON":레슨정보, "CHECKLISTS":준비물정보, "CURRICULUMS": 커리큘럼정보);
         각각의 KEY를 통해 객체 생성 후, DB에 데이터 삽입
        */
        Lesson lesson = (Lesson) lessonInfo.get("LESSON");
        List<Checklist> checkLists = (List<Checklist>)lessonInfo.get("CHECKLISTS");
        List<Curriculum> curriculums = (List<Curriculum>)lessonInfo.get("CURRICULUMS");

        lessonRepositorySupport.save(lesson);

        checkLists.forEach((checklist) -> {
            checklist.setLesson(lesson);
            checkListRepositorySupport.save(checklist);
        });

        curriculums.forEach((curriculum) -> {
            curriculum.setLesson(lesson);
            curriculumRepositorySupport.save(curriculum);
        });


    }
}
