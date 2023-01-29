package com.ssafy.api.service;

import com.ssafy.api.request.BookmarkRegisterPostReq;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("bookmarkService")
public class BookmarkServiceImpl implements BookmarkService {
    @Autowired
    BookmarkRepositorySupport bookmarkRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    LessonRepositorySupport lessonRepositorySupport;

    @Override
    public void create(BookmarkRegisterPostReq registerInfo) {
        Bookmark bookmark = Bookmark.builder()
                                    .lessonId(registerInfo.getLesson_id())
                                    .userId(
                                            userRepositorySupport.findId(registerInfo.getEmail())
                                    )
                                    .build();
        bookmarkRepositorySupport.save(bookmark);
    }
}
