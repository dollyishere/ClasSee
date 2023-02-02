package com.ssafy.api.service;

import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.dto.OpenLessonInfoDto;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonSchedulsRes;
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
    public List<LessonInfoDto> setLessonProperty(Long userId, List<Lesson> lessonList) {
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

            lessonRes.setBookmarked(
                    (bookmarkRepository.isBookmarked(userId, lesson.getId()) == 0)? false: true
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
    public LessonDetailsRes getLessonDetails(Long lessonId, String email) {
        Long userId = userRepositorySupport.findId(email);
        Lesson lesson = lessonRepository.findById(lessonId).get();

        User teacher = userRepositorySupport.findOne(lesson.getUser().getId());

        List<Curriculum> curriculums = lessonRepositorySupport.findCurriculumByLesson(lessonId);
        List<Checklist> checklists = lessonRepositorySupport.findCheckListByLesson(lessonId);
        List<Pamphlet> pamphlets = lessonRepositorySupport.findPamphletByLesson(lessonId);
        double score = lessonRepositorySupport.setLessonAvgScore(lesson);
        Long isBookmarked = bookmarkRepository.isBookmarked(userId, lessonId);

        LessonDetailsRes lessonDetailsRes = LessonDetailsRes.builder()
                .lessonName(lesson.getName())
                .cklsDescription(lesson.getCklsDescription())
                .kitPrice(lesson.getKitPrice())
                .kitDescription(lesson.getKitDescription())
                .category(lesson.getCategory())
                .runningtime(lesson.getRunningtime())
                .userName(teacher.getName())
                .userDesciption(teacher.getDescription())
                .profileImg(teacher.getImg())
                .curriculums(curriculums)
                .checkLists(checklists)
                .pamphlets(pamphlets)
                .score(score)
                .isBookmarked(isBookmarked)
                .build();
        return lessonDetailsRes;
    }

    @Override
    public LessonSchedulsRes getLessonSchedules(Long lessonId, LocalDate regDate) {
        List<OpenLesson> lessonSchedules = lessonRepositorySupport.findScheduleByLessonId(lessonId);
        List<OpenLessonInfoDto> lessonSchedulesRes = new ArrayList<>();
        lessonSchedules.forEach((schedule) ->{
            if(!regDate.isEqual(schedule.getStartTime().toLocalDate())) return;
            lessonSchedulesRes.add(
                    OpenLessonInfoDto.builder()
                            .openLessonId(schedule.getId())
                            .lessonId(schedule.getLessonId())
                            .startTime(schedule.getStartTime())
                            .endTime(schedule.getEndTime())
                            .build()
            );
        });

        LessonSchedulsRes res = LessonSchedulsRes.builder()
                .lessonScheduls(lessonSchedulesRes)
                .build();
        return res;
    }

    @Override
    public List<AttendLessonInfoDto> getAttendLessonList(Long userId, String query, String type) {
        List<OpenLesson> openLessonList = new ArrayList<>();
        if(type.toUpperCase().equals("T")) openLessonList = lessonRepositorySupport.findAttendLessonListByTeacher(userId, query);
        if(type.toUpperCase().equals("S")) openLessonList = lessonRepositorySupport.findAttendLessonListByStudent(userId, query);

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
}
