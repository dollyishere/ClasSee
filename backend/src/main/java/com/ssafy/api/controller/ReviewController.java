package com.ssafy.api.controller;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.request.QnaUpdatePutReq;
import com.ssafy.api.request.ReviewRegistPostReq;
import com.ssafy.api.request.ReviewUpdatePutReq;
import com.ssafy.api.response.PageGetRes;
import com.ssafy.api.response.ReviewListGetRes;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.lesson.Review;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/{lesson_id}")
    @ApiOperation(value = "리뷰 목록 조회", notes = "리뷰를 볼 lesson id와 limit(가져올 수), offset(시작지점)을 입력하면 목록을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> reviewList(@PathVariable Long lesson_id, @RequestParam int offset, @RequestParam int limit){

        List<Review> reviewList = reviewService.readReview(lesson_id, offset, limit);

        List<ReviewListGetRes> reviewListGetResList =
                reviewList
                        .stream()
                        .map(r -> new ReviewListGetRes(r))
                        .collect(Collectors.toList());

        Long reviewCount = reviewService.countReview();

        PageGetRes reviewPage = new PageGetRes();
        reviewPage.setCount(reviewCount);
        reviewPage.setPage(reviewListGetResList);

        return ResponseEntity.status(200).body(reviewPage);
    }

    @DeleteMapping()
    @ApiOperation(value = "리뷰 삭제", notes = "리뷰 id를 입력 받아 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteReview(@PathVariable Long id) {

        reviewService.deleteReview(id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PutMapping()
    @ApiOperation(value = "리뷰 수정", notes = "내가 한 리뷰 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> updateQna(@RequestBody ReviewUpdatePutReq reviewUpdatePutReq) {

        reviewService.updateReview(reviewUpdatePutReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));

    }


}
