package com.ssafy.api.service;

import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.db.entity.board.Photocard;

import java.util.List;

public interface PhotocardService {

    void createPhotocard(PhotocardRegistPostReq photocardRegistPostReq);
    List<Photocard> readPhotocardList(int offset, int limit);
    List<Photocard> readMyPhotocardList(int offset, int limit, String email);
    Long photocardCount();
    Long myPhotocardCount(String email);
    void deletePhotocard(Long id);
    Long likesCount(Photocard photocard);
    Boolean likesCheck(String email, Long id);
    void createLikes(String email, Long id);
    void deleteLikes(String email, Long id);



}
