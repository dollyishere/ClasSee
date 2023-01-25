package com.ssafy.db.repository;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<User, Long> {
}
