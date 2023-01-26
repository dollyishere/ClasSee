package com.ssafy.api.service;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService{
    @Autowired
    LessonRepositorySupport lessonRepositorySupport;

    @Override
    public List<Lesson> getLessonList(User user) {
        // 해당 유저가 생성한 강의 목록 얻어오기
         /*
         대표 이미지
         강의명,
         강의 소요시간,
         카테고리,
         별점 평균
          */
        List<Lesson> lessons = lessonRepositorySupport.findLessonListByUserId(user);
        return lessons;
    }
}
