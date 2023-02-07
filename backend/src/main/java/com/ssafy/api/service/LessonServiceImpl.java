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
    BookmarkRepositorySupport bookmarkRepositorySupport;
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
            checkListRepositorySupport.delete(lesson.getId());

            checklist.setLessonId(lesson.getId());
            checkListRepositorySupport.save(checklist);
        });

        curriculums.forEach((curriculum) -> {
            curriculumRepositorySupport.delete(lesson.getId());

            curriculum.setLessonId(lesson.getId());
            curriculumRepositorySupport.save(curriculum);
        });

        pamphlets.forEach((pamphlet) -> {
            pamphletRepositorySupport.delete(lesson.getId());

            pamphlet.setLessonId(lesson.getId());
            pamphletRepositorySupport.save(pamphlet);
        });
    }

    @Override
    public List<LessonInfoDto> setLessonProperty(List<Lesson> lessonList, User user) {
        List<LessonInfoDto> getLessonList = new ArrayList<>();
        // 강의 목록에 대표 이미지랑, 별점 평균 세팅해주기
        lessonList.forEach((lesson) -> {
            // 대표 이미지
            LessonInfoDto lessonRes = LessonInfoDto.builder()
                    .id(lesson.getId())
                    .name(lesson.getName())
                    .category(lesson.getCategory())
                    .runningTime(lesson.getRunningtime())
                    .build();
            lessonRes.setTeacherImage(
                    lesson.getUser().getImg()
            );

            lessonRes.setLessonImage(
                    lessonRepositorySupport.findLessonProfileImg(lesson)
            );

            lessonRes.setBookMarked(
                    (bookmarkRepositorySupport.bookmarkedCheck(lesson.getId(), user) == 0) ? false: true
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
    public LessonDetailsRes getLessonDetails(Long lessonId, User user) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if(!lesson.isPresent()) return null;
        User teacher = userRepositorySupport.findOne(lesson.get().getUser().getId());

        List<Curriculum> curriculums = lessonRepositorySupport.findCurriculumByLesson(lessonId);
        List<Checklist> checklists = lessonRepositorySupport.findCheckListByLesson(lessonId);
        List<Pamphlet> pamphlets = lessonRepositorySupport.findPamphletByLesson(lessonId);
        double score = lessonRepositorySupport.setLessonAvgScore(lesson.get());
        Long isBookMarked = bookmarkRepositorySupport.bookmarkedCheck(lessonId, user);

        LessonDetailsRes lessonDetailsRes = LessonDetailsRes.builder()
                .teacherEmail(teacher.getAuth().getEmail())
                .lessonName(lesson.get().getName())
                .lessonDescription(lesson.get().getDescription())
                .cklsDescription(lesson.get().getCklsDescription())
                .kitPrice(lesson.get().getKitPrice())
                .kitDescription(lesson.get().getKitDescription())
                .category(lesson.get().getCategory())
                .runningTime(lesson.get().getRunningtime())
                .userName(teacher.getName())
                .userDesciption(teacher.getDescription())
                .teacherImage(teacher.getImg())
                .curriculums(curriculums)
                .maximum(lesson.get().getMaximum())
                .checkLists(checklists)
                .pamphlets(pamphlets)
                .isBookMarked((isBookMarked == 0) ? false: true)
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
            List<Pamphlet> pamphletList = lesson.get().getPamphletList();
            if(!lesson.isPresent()) return;
            attendLessonList.add(
                    AttendLessonInfoDto.builder()
                            .lessonId(openLesson.getLessonId())
                            .openLessonId(openLesson.getId())
                            .name(lesson.get().getName())
                            .runningTime(lesson.get().getRunningtime())
                            .category(lesson.get().getCategory())
                            .lessonImage(
                                    ((pamphletList == null) ? pamphletList.get(0).getImg(): null)
                            )
                            .teacherImage(lesson.get().getUser().getImg())
                            .score(lessonRepositorySupport.setLessonAvgScore(lesson.get()))
                            .startTime(openLesson.getStartTime())
                            .endTime(openLesson.getEndTime())
                            .isBookMarked(
                                    (bookmarkRepositorySupport.bookmarkedCheck(lesson.get().getId(), userRepositorySupport.findOne(userId))) == 0 ? false: true
                            )
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
