package com.ssafy.api.service;

import com.ssafy.api.request.BookmarkRegisterReq;
import com.ssafy.db.entity.lesson.Lesson;

import java.util.List;

/**
 *	북마크 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface BookmarkService {
    void create(String email, Long lessonId);
    void delete(String email, Long lessonId);

    List<Lesson> getBookmarkList(Long userId);
}
