package com.ssafy.api.service;

import com.ssafy.api.request.QnaAnswerRegistPostReq;
import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.request.QnaUpdatePutReq;
import com.ssafy.db.entity.qna.Qna;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QnaService {

    void createQna(QnaRegisterPostReq qnaRegisterPostReq);

    void createQnaAnswer(QnaAnswerRegistPostReq qnaAnswerRegistPostReq);

    void deleteQna(Long id);

    void deleteQnaAnswer(Long id);

    Qna readQna(Long id);

    Long qnaCount();

    List<Qna> readQnaList(int offset, int limit, String email);

    void updateQna(QnaUpdatePutReq qnaUpdatePutReq);
}
