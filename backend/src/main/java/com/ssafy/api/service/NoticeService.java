package com.ssafy.api.service;

import com.ssafy.api.request.NoticeCreatePostReq;

public interface NoticeService {

    void createNotice(NoticeCreatePostReq noticeCreatePostReq) throws Exception;
    void readNotice();
    void updateNotice();
    void deleteNotice(String email, Long id) throws Exception;

}
