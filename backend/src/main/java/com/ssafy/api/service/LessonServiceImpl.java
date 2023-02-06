package com.ssafy.api.service;

import com.querydsl.core.Tuple;
import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.dto.LessonSearchFilterDto;
import com.ssafy.api.dto.OpenLessonInfoDto;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonSchedulesRes;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    public Long createLesson(Map<String, Object> lessonInfo) {
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

        return lesson.getId();
    }

    @Override
    public void updateLesson(Map<String, Object> lessonInfo) {
        Lesson lesson = (Lesson) lessonInfo.get("LESSON");
        List<Checklist> checkLists = (List<Checklist>) lessonInfo.get("CHECKLISTS");
        List<Curriculum> curriculums = (List<Curriculum>) lessonInfo.get("CURRICULUMS");
        List<Pamphlet> pamphlets = (List<Pamphlet>) lessonInfo.get("PAMPHLET");

        lessonRepositorySupport.update(lesson);

        checkLists.forEach((checklist) -> {
            checkListRepositorySupport.update(checklist);
        });

        curriculums.forEach((curriculum) -> {
            curriculumRepositorySupport.update(curriculum);
        });

        pamphlets.forEach((pamphlet) -> {
            pamphletRepositorySupport.update(pamphlet);
        });
    }

    @Override
    public List<LessonInfoDto> setLessonProperty(List<Lesson> lessonList) {
        List<LessonInfoDto> getLessonList = new ArrayList<>();
        // 강의 목록에 대표 이미지랑, 별점 평균 세팅해주기
        lessonList.forEach((lesson) -> {
            // 대표 이미지
            LessonInfoDto lessonRes = LessonInfoDto.builder()
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
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if(!lesson.isPresent()) return null;
        User teacher = userRepositorySupport.findOne(lesson.get().getUser().getId());

        List<Curriculum> curriculums = lessonRepositorySupport.findCurriculumByLesson(lessonId);
        List<Checklist> checklists = lessonRepositorySupport.findCheckListByLesson(lessonId);
        List<Pamphlet> pamphlets = lessonRepositorySupport.findPamphletByLesson(lessonId);
        double score = lessonRepositorySupport.setLessonAvgScore(lesson.get());

        LessonDetailsRes lessonDetailsRes = LessonDetailsRes.builder()
                .userEmail(teacher.getAuth().getEmail())
                .lessonName(lesson.get().getName())
                .lessonDescription(lesson.get().getDescription())
                .cklsDescription(lesson.get().getCklsDescription())
                .kitPrice(lesson.get().getKitPrice())
                .kitDescription(lesson.get().getKitDescription())
                .category(lesson.get().getCategory())
                .runningtime(lesson.get().getRunningtime())
                .userName(teacher.getName())
                .userDesciption(teacher.getDescription())
                .profileImg(teacher.getImg())
                .curriculums(curriculums)
                .checkLists(checklists)
                .pamphlets(pamphlets)
                .score(score)
                .build();
        return lessonDetailsRes;
    }

    @Override
    public LessonSchedulesRes getLessonSchedules(Long lessonId, LocalDate regDate) {
        List<OpenLesson> lessonSchedules = lessonRepositorySupport.findScheduleByLessonId(lessonId, regDate);
        List<OpenLessonInfoDto> lessonSchedulesRes = new ArrayList<>();
        lessonSchedules.forEach((schedule) ->{
            lessonSchedulesRes.add(
                    OpenLessonInfoDto.builder()
                            .openLessonId(schedule.getId())
                            .lessonId(schedule.getLessonId())
                            .startTime(schedule.getStartTime())
                            .endTime(schedule.getEndTime())
                            .build()
            );
        });

        LessonSchedulesRes res = LessonSchedulesRes.builder()
                .lessonSchedules(lessonSchedulesRes)
                .build();
        return res;
    }


    /*
         리뷰 테이블에서
    */
    @Override
    public List<Lesson> getPopularLessonList() {
        List<Lesson> res = new ArrayList<>();
        List<Long> popularLessonList = lessonRepositorySupport.findPopularLesson();

        popularLessonList.forEach((popularLesson) -> {
            Optional<Lesson> lesson = lessonRepository.findById(popularLesson);
            if(!lesson.isPresent()) return;
            res.add(lesson.get());
        });

        return res;
    }

    @Override
    public List<AttendLessonInfoDto> getAttendLessonList(Long userId, String query, String type, int limit, int offset) {
        List<OpenLesson> openLessonList = new ArrayList<>();
        if(type.toUpperCase().equals("T")) openLessonList = lessonRepositorySupport.findAttendLessonListByTeacher(userId, query, limit, offset);
        if(type.toUpperCase().equals("S")) openLessonList = lessonRepositorySupport.findAttendLessonListByStudent(userId, query, limit, offset);

        List<AttendLessonInfoDto> attendLessonList = new ArrayList<>();
        openLessonList.forEach((openLesson) -> {
            Optional<Lesson> lesson = lessonRepository.findById(openLesson.getLessonId());
            if(!lesson.isPresent()) return;
            attendLessonList.add(
                    AttendLessonInfoDto.builder()
                            .lessonId(openLesson.getLessonId())
                            .openLessonid(openLesson.getId())
                            .name(lesson.get().getName())
                            .runningtime(lesson.get().getRunningtime())
                            .category(lesson.get().getCategory())
                            .img(lesson.get().getPamphletList().get(0).getImg())
                            .score(lessonRepositorySupport.setLessonAvgScore(lesson.get()))
                            .isBookmarked(
                                    (bookmarkRepository.isBookmarked(userId, lesson.get().getId()) == 0) ? false : true
                            )
                            .startTime(openLesson.getStartTime())
                            .endTime(openLesson.getEndTime())
                            .build()
            );
        });
        return attendLessonList;
    }

    @Override
    public List<Lesson> getLessonListByFilter(LessonSearchFilterDto requestInfo, int offset, int limit) {
        return lessonRepositorySupport.findLessonListByFilter(requestInfo, offset, limit);
    }

    @Override
    public int deleteLesson(Long lessonId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if(!lesson.isPresent()) return 0;

        Long attendUserCnt = lessonRepositorySupport.existsUserInLesson(lessonId);
        if(attendUserCnt >= 1) return 0;

        lessonRepositorySupport.deleteOpenLessonByLessonId(lessonId);
        lessonRepository.delete(lesson.get());
        return 1;
    }

    @Override
    public int deleteOpenLesson(Long openLessonId) {
        Long attendUserCnt = lessonRepositorySupport.existsUserInOpenLesson(openLessonId);
        if(attendUserCnt >= 1) return 0;

        lessonRepositorySupport.deleteOpenLesson(openLessonId);
        return 1;
    }
}
