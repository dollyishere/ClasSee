package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.LessonRepository;
import com.ssafy.db.repository.LessonRepositorySupport;
import com.ssafy.db.repository.PhotocardRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Service("PhotocardService")
@Transactional
public class PhotocardServiceImpl implements PhotocardService {

    @Autowired
    PhotocardRepositorySupport photocardRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    LessonRepository lessonRepository;



    @Override
    public void createPhotocard(PhotocardRegistPostReq photocardRegistPostReq) {

        User user = userRepositorySupport
                .findUserByAuth(photocardRegistPostReq.getUser_email())
                .get();

        Lesson lesson = photocardRepositorySupport
                .findOneLesson(photocardRegistPostReq.getLesson_id());


        Photocard photocard = Photocard.builder()
                .title(photocardRegistPostReq.getTitle())
                .content(photocardRegistPostReq.getContent())
                .img(photocardRegistPostReq.getImg())
                .sign(photocardRegistPostReq.getSign())
                .regDate(LocalDateTime.now().toString())
                .user(user)
                .lesson(lesson)
                .build();

        photocardRepositorySupport.save(photocard);
        return;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Photocard> readPhotocardList(int offset, int limit) {

        return photocardRepositorySupport
                .findList(offset, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public Long photocardCount() {

        return photocardRepositorySupport.photocardCount();
    }

    @Override
    public void deletePhotocard(String email, Long id) {
        User user = userRepositorySupport
                .findUserByAuth(email)
                .get();

        Photocard photocard = photocardRepositorySupport
                .findOne(id);

        photocardRepositorySupport.delete(photocard);

    }
}
