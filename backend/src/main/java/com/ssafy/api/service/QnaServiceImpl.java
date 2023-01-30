package com.ssafy.api.service;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.db.entity.qna.Qna;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.QnaRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service("QnAService")
@Transactional
public class QnaServiceImpl implements QnaService {

    @Autowired
    QnaRepositorySupport qnaRepositorySupport;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public void createQna(QnaRegisterPostReq qnaRegisterPostReq) {
        Qna qna = Qna.builder()
                .title(qnaRegisterPostReq.getTitle())
                .content(qnaRegisterPostReq.getContent())
                .regTime(LocalDateTime.now().toString())
                .user(userRepositorySupport.findUserByAuth(qnaRegisterPostReq.getUser_email()).get())
                .build();

        qnaRepositorySupport.save(qna);
    }

    @Override
    public void deleteQna(Long id) {

        Qna qna = qnaRepositorySupport
                .findOne(id);

            qnaRepositorySupport.delete(qna);

    }

    @Override
    public Qna readQna() {
        return null;
    }

    @Override
    public void updateQna() {

    }

    @Override
    public boolean checkUser(String email, Long id) {

        User user = userRepositorySupport
                .findUserByAuth(email)
                .get();

        Qna qna = qnaRepositorySupport
                .findOne(id);

        if(user.getId() == qna.getUser().getId()){
            return true;
        } else {
           return false;
        }

    }
}
