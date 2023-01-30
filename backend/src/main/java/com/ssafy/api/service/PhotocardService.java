package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Photocard;

import java.util.List;

public interface PhotocardService {

    void createPhotocard(PhotocardRegistPostReq photocardRegistPostReq);
    List<Photocard> readPhotocardList(String email);
    Long photocardCount();
    void deletePhotocard(String email, Long id);



}
