package com.ssafy.api.service;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.db.entity.qna.Qna;

public interface QnaService {

    void createQna(QnaRegisterPostReq qnaRegisterPostReq);

    void deleteQna(Long id);

    Qna readQna();

    void updateQna();

    boolean checkUser(String email, Long id);

}
