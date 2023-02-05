package com.ssafy.api.controller;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.request.ReviewRegistPostReq;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Review API", tags = {"Review"})
@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping()
    @ApiOperation(value = "리뷰 등록", notes = "리뷰 내용과 이메일, openLesson_id를 입력받은 뒤 리뷰를 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> registReview(@RequestBody ReviewRegistPostReq reviewRegistPostReq){

        reviewService.createReview(reviewRegistPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }


}
