package com.ssafy.api.service;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.request.QnaUpdatePutReq;
import com.ssafy.db.entity.qna.Qna;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.QnaRepositorySupport;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

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
    public void deleteQna(String email, Long id) throws Exception {

        User user = userRepositorySupport
                .findUserByAuth(email)
                .get();

        Qna qna = qnaRepositorySupport
                .findOne(id);

        if(user.getId() == qna.getUser().getId()){
            qnaRepositorySupport.delete(qna);
        } else {
            throw new Exception("작성자와 일치하지 않습니다");
        }

    }

    @Override
    @Transactional(readOnly = true)
    public Qna readQna(Long id) {
        return qnaRepositorySupport.findOne(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Qna> readQnaList(int offset, int limit, String email) {
        User user = userRepositorySupport
                .findUserByAuth(email)
                .get();

        Long user_id = user.getId();

        return qnaRepositorySupport.findList(offset, limit, user_id);
    }

    @Override
    @Transactional(readOnly = true)
    public Long qnaCount(){
        return qnaRepositorySupport
                .QnaCount();
    }

    @Override
    public void updateQna(QnaUpdatePutReq qnaUpdatePutReq) throws Exception {

        User user = userRepositorySupport
                .findUserByAuth(qnaUpdatePutReq.getUser_email())
                .get();

        Qna qna = qnaRepositorySupport
                .findOne(qnaUpdatePutReq.getId());

        if(user.getId() == qna.getUser().getId()){
            qnaRepositorySupport.updateQna(qnaUpdatePutReq);
        } else {
            throw new Exception("작성자와 일치하지 않습니다");
        }

    }

}
