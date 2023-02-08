package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Likes;
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

        Long user_id = userRepositorySupport.findId(photocardRegistPostReq.getUserEmail());
        User user = userRepositorySupport.findOne(user_id);


        Lesson lesson = photocardRepositorySupport
                .findOneLesson(photocardRegistPostReq.getLessonId());


        Photocard photocard = Photocard.builder()
                .title(photocardRegistPostReq.getTitle())
                .content(photocardRegistPostReq.getContent())
                .img(photocardRegistPostReq.getImg())
                .sign(photocardRegistPostReq.getSign())
                .regDate(LocalDateTime.now().toString())
                .lesson_name(lesson.getName())
                .user(user)
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
    public List<Photocard> readMyPhotocardList(int offset, int limit, String email) {

        Long user_id = userRepositorySupport.findId(email);

        return photocardRepositorySupport
                .findMyList(offset, limit, user_id);
    }

    @Override
    @Transactional(readOnly = true)
    public Long photocardCount() {

        return photocardRepositorySupport.photocardCount();
    }

    @Override
    @Transactional(readOnly = true)
    public Long myPhotocardCount(String email) {
        Long user_id = userRepositorySupport.findId(email);
        return photocardRepositorySupport.myPhotocardCount(user_id);
    }

    @Override
    public void deletePhotocard(Long id) {

        Photocard photocard = photocardRepositorySupport
                .findOne(id);

        photocardRepositorySupport.delete(photocard);

    }

    @Override
    @Transactional(readOnly = true)
    public Long countLikes(Photocard photocard) {

        Long id = photocard.getId();

        return photocardRepositorySupport
                .countLikes(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean checkLikes(String email, Long id) {
        Long user_id = userRepositorySupport.findId(email);

        if(photocardRepositorySupport.checkLikes(id, user_id) == null){
            return false;
        } else{
            return true;
        }
    }

    @Override
    public void createLikes(String email, Long id) {
        Long user_id = userRepositorySupport
                .findId(email);

        User user = userRepositorySupport
                .findOne(user_id);

        Photocard photocard = photocardRepositorySupport
                .findOne(id);

        Likes likes = Likes
                .builder()
                .user(user)
                .photocard(photocard)
                .build();

        photocardRepositorySupport.saveLikes(likes);
        return;
    }

    @Override
    public void deleteLikes(String email, Long id) {
        Long user_id = userRepositorySupport.findId(email);

        Likes likes = photocardRepositorySupport.findOneLikes(user_id, id);

        photocardRepositorySupport.deleteLikes(likes);
        return;
    }


}
