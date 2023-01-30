package com.ssafy.api.service;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.db.entity.qna.Qna;

public interface QnaService {

    void createQna(QnaRegisterPostReq qnaRegisterPostReq);

    void deleteQna(String email, Long id) throws Exception;

    Qna readQna();

    void updateQna();

}
