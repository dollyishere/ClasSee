package com.ssafy.api.service;

import com.ssafy.api.request.BookmarkRegisterReq;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public void create(BookmarkRegisterReq requestInfo) {
        Bookmark bookmark = Bookmark.builder()
                                    .lessonId(requestInfo.getLesson_id())
                                    .userId(
                                            userRepositorySupport.findId(requestInfo.getEmail())
                                    )
                                    .build();
        bookmarkRepositorySupport.save(bookmark);
    }

    @Override
    public void delete(String email, Long lessonId) {
        Long userId = userRepositorySupport.findId(email);

        bookmarkRepository.removeBookmark(userId, lessonId);
    }
}
