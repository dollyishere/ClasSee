package com.ssafy.api.service;

import com.ssafy.api.request.NoticeRegisterPostReq;
import com.ssafy.db.entity.board.Notice;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoticeService {

    void createNotice(NoticeRegisterPostReq noticeRegisterPostReq) throws Exception;
    Notice readNotice(Long id);
    List<Notice> readNoticeList(int offset, int limit);
    void updateNotice();
    void deleteNotice(String email, Long id) throws Exception;

}
