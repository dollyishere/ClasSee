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
    public int create(Long userId, Long lessonId) {
        Bookmark bookmark = Bookmark.builder()
                .lessonId(lessonId)
                .userId(userId)
                .build();
        boolean isExist = bookmarkRepositorySupport.isExist(userId, lessonId);
        if(!isExist) return 0;

        bookmarkRepositorySupport.save(bookmark);
        return 1;
    }

    @Override
    public void delete(String email, Long lessonId) {
        Long userId = userRepositorySupport.findId(email);

        bookmarkRepository.removeBookmark(userId, lessonId);
    }

    @Override
    public List<Lesson> getBookmarkList(Long userId, int limit, int offset) {
        List<Long> lessonIdList = bookmarkRepositorySupport.findBookmarkList(userId, limit, offset);
        List<Lesson> lessonList = new ArrayList<>();

        lessonIdList.forEach((lessonId) -> {
            Optional<Lesson> lesson = lessonRepository.findById(lessonId);
            if(!lesson.isPresent()) return;
            lessonList.add(lesson.get());
        });

        return lessonList;
    }

    @Override
    public Long getBookmarkCount(Long userId) {
        return bookmarkRepositorySupport.findBookmarkCount(userId);
    }
}
