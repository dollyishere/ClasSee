package com.ssafy.api.service;

import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;

import java.util.List;
import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LessonService {
    void createLesson(Map<String, Object> lessonInfo);

    List<LessonInfoDto> setLessonProperty(List<Lesson> lessonList);

    void createSchedule(OpenLesson requestInfo) throws Exception;

    LessonDetailsRes getLessonDetails(Long lessonId, String email);
}
