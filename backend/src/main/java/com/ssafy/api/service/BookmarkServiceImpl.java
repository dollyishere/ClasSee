package com.ssafy.api.service;

import com.ssafy.api.request.BookmarkRegisterReq;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("bookmarkService")
public class BookmarkServiceImpl implements BookmarkService {
    @Autowired
    BookmarkRepositorySupport bookmarkRepositorySupport;
    @Autowired
    BookmarkRepository bookmarkRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    LessonRepositorySupport lessonRepositorySupport;

    @Autowired
    LessonRepository lessonRepository;

    @Override
    public void create(String email, Long lessonId) {
        Bookmark bookmark = Bookmark.builder()
                                    .lessonId(lessonId)
                                    .userId(
                                            userRepositorySupport.findId(email)
                                    )
                                    .build();
        bookmarkRepositorySupport.save(bookmark);
    }

    @Override
    public void delete(String email, Long lessonId) {
        Long userId = userRepositorySupport.findId(email);

        bookmarkRepository.removeBookmark(userId, lessonId);
    }

    @Override
    public List<Lesson> getBookmarkList(Long userId) {
        List<Long> lessonIdList = bookmarkRepositorySupport.findBookmarkList(userId);
        List<Lesson> lessonList = new ArrayList<>();

        lessonIdList.forEach((lessonId) -> {
            Optional<Lesson> lesson = lessonRepository.findById(lessonId);
            if(!lesson.isPresent()) return;
            lessonList.add(lesson.get());
        });

        return lessonList;
    }
}
