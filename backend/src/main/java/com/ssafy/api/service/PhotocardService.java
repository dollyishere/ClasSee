package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Photocard;

import java.util.List;

public interface PhotocardService {

    void createPhotocard(PhotocardRegistPostReq photocardRegistPostReq);
    List<Photocard> readPhotocardList(int offset, int limit);
    Long photocardCount();
    void deletePhotocard(String email, Long id);
    Long likesCount(Photocard photocard);
    Boolean likesCheck(String email, Long id);
    void createLikes(String email, Long id);



}
