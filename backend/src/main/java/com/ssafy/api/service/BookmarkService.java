package com.ssafy.api.service;

import com.ssafy.api.request.BookmarkRegisterPostReq;

import java.util.Map;

/**
 *	북마크 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface BookmarkService {
    void create(BookmarkRegisterPostReq registerInfo);
}
