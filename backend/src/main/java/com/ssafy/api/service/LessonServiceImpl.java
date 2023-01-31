package com.ssafy.api.service;

import com.ssafy.api.request.LessonScheduleRegisterPostReq;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonListGetRes;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LessonServiceImpl implements LessonService {
    @Autowired
    BookmarkRepository bookmarkRepository;
    @Autowired
    LessonRepositorySupport lessonRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    LessonRepository lessonRepository;
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
        List<Checklist> checkLists = (List<Checklist>) lessonInfo.get("CHECKLISTS");
        List<Curriculum> curriculums = (List<Curriculum>) lessonInfo.get("CURRICULUMS");
        List<Pamphlet> pamphlets = (List<Pamphlet>) lessonInfo.get("PAMPHLET");

        lessonRepositorySupport.save(lesson);

        checkLists.forEach((checklist) -> {
            checklist.setLessonId(lesson.getId());
            checkListRepositorySupport.save(checklist);
        });

        curriculums.forEach((curriculum) -> {
            curriculum.setLessonId(lesson.getId());
            curriculumRepositorySupport.save(curriculum);
        });

        pamphlets.forEach((pamphlet) -> {
            pamphlet.setLessonId(lesson.getId());
            pamphletRepositorySupport.save(pamphlet);
        });
    }

    @Override
    public List<LessonListGetRes> setLessonProperty(List<Lesson> lessonList) {
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
    public void createSchedule(OpenLesson requestInfo) throws Exception {
        lessonRepositorySupport.save(requestInfo);
    }

    @Override
    public LessonDetailsRes getLessonDetails(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).get();
        Long userId = lesson.getUser().getId();
        User user = userRepositorySupport.findOne(userId);
        List<Curriculum> curriculums = lessonRepositorySupport.findCurriculumByLesson(lessonId);
        List<Checklist> checklists = lessonRepositorySupport.findCheckListByLesson(lessonId);
        List<OpenLesson> openLessons = lessonRepositorySupport.findScheduleByLesson(lessonId);
        List<Pamphlet> pamphlets = lessonRepositorySupport.findPamphletByLesson(lessonId);
        double score = lessonRepositorySupport.setLessonAvgScore(lesson);
        Long isBookmarked = bookmarkRepository.isBookmarked(userId, lessonId);

        LessonDetailsRes lessonDetailsRes = LessonDetailsRes.builder()
                .lessonName(lesson.getName())
                .cklsDescription(lesson.getCklsDescription())
                .kitPrice(lesson.getKitPrice())
                .category(lesson.getCategory())
                .runningtime(lesson.getRunningtime())
                .userName(user.getName())
                .userDesciption(user.getDescription())
                .profileImg(user.getImg())
                .curriculums(curriculums)
                .openLessons(openLessons)
                .checkLists(checklists)
                .pamphlets(pamphlets)
                .isBookmarked(isBookmarked)
                .build();
        return lessonDetailsRes;
    }
}
