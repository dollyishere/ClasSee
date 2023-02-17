package com.ssafy.api.service;

import com.querydsl.core.Tuple;
import com.ssafy.api.dto.*;
import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonSchedulesRes;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    OrdersRepositorySupport ordersRepositorySupport;

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
        List<Pamphlet> pamphlets = (List<Pamphlet>) lessonInfo.get("PAMPHLETS");

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
        List<Pamphlet> pamphlets = (List<Pamphlet>) lessonInfo.get("PAMPHLETS");

        checkListRepositorySupport.delete(lesson.getId());
        curriculumRepositorySupport.delete(lesson.getId());
        pamphletRepositorySupport.delete(lesson.getId());

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

        lessonRepositorySupport.update(lesson);
    }

    @Override
    public List<LessonInfoDto> setLessonProperty(List<Lesson> lessonList, User user) {
        List<LessonInfoDto> getLessonList = new ArrayList<>();
        // 강의 목록에 대표 이미지랑, 별점 평균 세팅해주기
        lessonList.forEach((lesson) -> {
            // 대표 이미지
            LessonInfoDto lessonRes = LessonInfoDto.builder()
                    .lessonId(lesson.getId())
                    .price(lesson.getPrice())
                    .kitPrice(lesson.getKitPrice())
                    .name(lesson.getName())
                    .category(lesson.getCategory())
                    .runningTime(lesson.getRunningtime())
                    .teacher(lesson.getUser().getAuth().getEmail())
                    .build();
            lessonRes.setTeacherImage(
                    lesson.getUser().getImg()
            );

            lessonRes.setLessonImage(
                    lessonRepositorySupport.findLessonProfileImg(lesson)
            );

            lessonRes.setBookMarked(
                    bookmarkRepositorySupport.bookmarkedCheck(lesson.getId(), user)
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
        boolean isBookMarked = bookmarkRepositorySupport.bookmarkedCheck(lessonId, user);
        boolean isAttended = ordersRepositorySupport.AttendedCheck(lessonId, user);

        LessonDetailsRes lessonDetailsRes = LessonDetailsRes.builder()
                .lessonId(lessonId)
                .price(lesson.get().getPrice())
                .teacher(teacher.getAuth().getEmail())
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
                .isBookMarked(isBookMarked)
                .isAttended(isAttended)
                .score(score)
                .build();
        return lessonDetailsRes;
    }

    @Override
    public LessonSchedulesRes getLessonSchedules(Long lessonId, LocalDate regDate) {
        List<OpenLesson> lessonSchedules = lessonRepositorySupport.findScheduleByLessonId(lessonId, regDate);
        List<OpenLessonInfoDto> lessonSchedulesRes = new ArrayList<>();
        lessonSchedules.forEach((schedule) ->{
            Long totalCount = lessonRepository.getOne(schedule.getLessonId()).getMaximum();
            Long attendCount = lessonRepositorySupport.findAttendCount(schedule.getId());

            lessonSchedulesRes.add(
                    OpenLessonInfoDto.builder()
                            .openLessonId(schedule.getId())
                            .lessonId(schedule.getLessonId())
                            .totalCount(totalCount)
                            .attendCount(attendCount)
                            .startTime(schedule.getStartTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                            .endTime(schedule.getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
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
    public AttendLessonInfoListRes getAttendLessonListByStudent(Long userId, String query, int limit, int offset) {
        Map<String, Object> attendLessonDto = lessonRepositorySupport.findAttendLessonListByStudent(userId, query, limit, offset);
        List<OpenLesson> openLessonList = (List<OpenLesson>) attendLessonDto.get("LESSON_LIST");
        Long count = (Long) attendLessonDto.get("COUNT");

        List<AttendOpenLessonInfoDto> attendLessonList = new ArrayList<>();

        openLessonList.forEach((openLesson) -> {
            Optional<Lesson> lesson = lessonRepository.findById(openLesson.getLessonId());
            List<Pamphlet> pamphletList = lesson.get().getPamphletList();
            if(!lesson.isPresent()) return;
            attendLessonList.add(
                    AttendOpenLessonInfoDto.builder()
                            .lessonId(openLesson.getLessonId())
                            .openLessonId(openLesson.getId())
                            .name(lesson.get().getName())
                            .runningTime(lesson.get().getRunningtime())
                            .category(lesson.get().getCategory())
                            .lessonImage(
                                    ((pamphletList.size() <= 0) ? null : pamphletList.get(0).getImg())
                            )
                            .teacher(lesson.get().getUser().getAuth().getEmail())
                            .teacherImage(lesson.get().getUser().getImg())
                            .score(lessonRepositorySupport.setLessonAvgScore(lesson.get()))
                            .startTime(openLesson.getStartTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                            .endTime(openLesson.getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                            .isBookMarked(bookmarkRepositorySupport.bookmarkedCheck(lesson.get().getId(), userRepositorySupport.findOne(userId)))
                            .price(lesson.get().getPrice())
                            .kitPrice(lesson.get().getKitPrice())
                            .build()
            );
        });

        AttendLessonInfoListRes res = AttendLessonInfoListRes
                                                    .builder()
                                                    .lessonInfoList(attendLessonList)
                                                    .count(count)
                                                    .build();
        return res;
    }

    @Override
    public AttendLessonInfoListRes getAttendLessonListByTeacher(Long userId, int limit, int offset) {
        HashMap<String, Object> result = lessonRepositorySupport.findAttendLessonListByTeacher(userId, limit, offset);

        List<Lesson> lessonList = (List<Lesson>) result.get("LESSON_LIST");
        List<AttendLessonInfoDto> attendLessonList = new ArrayList<>();

        lessonList.forEach((lesson) -> {
            List<Pamphlet> pamphletList = lesson.getPamphletList();

            attendLessonList.add(
                    AttendLessonInfoDto.builder()
                            .lessonId(lesson.getId())
                            .name(lesson.getName())
                            .runningTime(lesson.getRunningtime())
                            .category(lesson.getCategory())
                            .lessonImage(
                                    ((pamphletList.size() <= 0) ? null : pamphletList.get(0).getImg())
                            )
                            .teacherImage(lesson.getUser().getImg())
                            .teacher(lesson.getUser().getAuth().getEmail())
                            .score(lessonRepositorySupport.setLessonAvgScore(lesson))
                            .isBookMarked(bookmarkRepositorySupport.bookmarkedCheck(lesson.getId(), userRepositorySupport.findOne(userId)))
                            .price(lesson.getPrice())
                            .kitPrice(lesson.getKitPrice())
                            .build()
            );
        });
        return AttendLessonInfoListRes
                .builder()
                .lessonInfoList(attendLessonList)
                .count((Long)result.get("COUNT"))
                .build();
    }

    @Override
    public Map<String, Object> getLessonListByFilter(LessonSearchFilterDto requestInfo, int offset, int limit) {
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
