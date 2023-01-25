package com.ssafy.api.service;

import com.ssafy.api.request.NoticeCreatePostReq;
import com.ssafy.db.entity.board.Notice;
import com.ssafy.db.entity.user.Notification;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.repository.NoticeRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;

@Service("notificationService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepositorySupport noticeRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public void createNotice(NoticeCreatePostReq noticeCreatePostReq) throws Exception {

        User user = userRepositorySupport
                .findUserByAuth(noticeCreatePostReq.getEmail())
                .get();

        if(user.getRole().equals(UserRole.ROLE_ADMIN)) {
            Notice notice = Notice.builder()
                    .title(noticeCreatePostReq.getTitle())
                    .content(noticeCreatePostReq.getContent())
                    .hit(0)
                    .img(noticeCreatePostReq.getImg())
                    .regtime(LocalDateTime.now().toString())
                    .user(user)
                    .build();

            noticeRepositorySupport.save(notice);
            return;
        } else {
            throw new Exception("공지사항을 설정할 권한이 없습니다.");
        }
    }

    @Override
    public void readNotice() {

    }

    @Override
    public void updateNotice() {

    }

    @Override
    public void deleteNotice() {

    }
}
