package com.ssafy.api.service;

import com.querydsl.core.Tuple;
import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.dto.LessonSearchFilterDto;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonSchedulesRes;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import org.apache.tomcat.jni.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LessonService {
    Long createLesson(Map<String, Object> lessonInfo);
    void updateLesson(Map<String, Object> lessonInfo);

    List<LessonInfoDto> setLessonProperty(List<Lesson> lessonList, User user);

    void createSchedule(OpenLesson requestInfo) throws Exception;

    LessonDetailsRes getLessonDetails(Long lessonId, User user);

    LessonSchedulesRes getLessonSchedules(Long lessonId, LocalDate regDate);

    List<AttendLessonInfoDto> getAttendLessonList(Long userId, String query, String type, int limit, int offset);

    List<Lesson> getPopularLessonList();

    Map<String, Object> getLessonListByFilter(LessonSearchFilterDto requestInfo, int offset, int limit);

    int deleteLesson(Long lessonId);

    int deleteOpenLesson(Long openLessonId);
}
