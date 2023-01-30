package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepositorySupport;
import com.ssafy.db.repository.PhotocardRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("PhotocardService")
@Transactional
public class PhotocardServiceImpl implements PhotocardService {

    @Autowired
    PhotocardRepositorySupport photocardRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    LessonRepositorySupport lessonRepositorySupport;


    @Override
    public void createPhotocard(PhotocardRegistPostReq photocardRegistPostReq) {

        User user = userRepositorySupport
                .findUserByAuth(photocardRegistPostReq.getUser_email())
                .get();

//        Lesson lesson = lessonRepositorySupport
//                .findOne();

        Photocard photocard = Photocard.builder()
                .title(photocardRegistPostReq.getTitle())
                .content(photocardRegistPostReq.getContent())
                .img(photocardRegistPostReq.getImg())
                .sign(photocardRegistPostReq.getSign())
                .user(user)
//                .lesson(lesson)
                .build();

        photocardRepositorySupport.save(photocard);

    }

    @Override
    public List<Photocard> readPhotocardList(String email) {
        return null;
    }

    @Override
    public Long photocardCount() {
        return null;
    }

    @Override
    public void deletePhotocard(String email, Long id) {

    }
}
