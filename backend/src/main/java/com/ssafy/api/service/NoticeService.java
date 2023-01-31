package com.ssafy.api.service;

import com.ssafy.api.request.NoticeRegisterPostReq;
import com.ssafy.api.request.NoticeUpdatePutReq;
import com.ssafy.db.entity.board.Notice;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoticeService {

    void createNotice(NoticeRegisterPostReq noticeRegisterPostReq);
    Notice readNotice(Long id);
    List<Notice> readNoticeList(int offset, int limit);
    Long noticeCount();
    void updateNotice(NoticeUpdatePutReq noticeUpdatePutReq);
    void deleteNotice(String email, Long id);

}
