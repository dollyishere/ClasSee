package com.ssafy.api.service;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{
    @Autowired
    LessonRepositorySupport lessonRepositorySupport;
    @Override
    public List<Lesson> getLessonList(User user) {
        List<Lesson> lessons = lessonRepositorySupport.findLessonListByUserId(user);
        return lessons;
    }

    @Override
    public List<Lesson> getAttendLessonList(User user) {
        List<Lesson> lessons = lessonRepositorySupport.findAttendLessonListByUserId(user);
        return null;
    }
}
