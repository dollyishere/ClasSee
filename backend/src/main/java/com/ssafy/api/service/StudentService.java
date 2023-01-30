package com.ssafy.api.service;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;

import java.util.List;

public interface StudentService {
    List<Lesson> getLessonList(User user);
}
