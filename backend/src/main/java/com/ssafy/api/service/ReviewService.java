package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistPostReq;

public interface ReviewService {

    void createReview(ReviewRegistPostReq reviewRegistPostReq);

    void readReview();

    void updateReview();

    void deleteReview();

}
