package com.ssafy.api.controller;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.request.QnaUpdatePutReq;
import com.ssafy.api.request.ReviewRegistPostReq;
import com.ssafy.api.request.ReviewUpdatePutReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.exception.handler.LessonException;
import com.ssafy.common.exception.handler.OpenLessonException;
import com.ssafy.common.exception.handler.ReviewException;
import com.ssafy.common.exception.handler.UserException;
import com.ssafy.common.model.response.*;
import com.ssafy.db.entity.lesson.Review;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Api(value = "Review API", tags = {"Review"})
@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping()
    @ApiOperation(value = "리뷰 등록, 로그인 O", notes = "리뷰 내용과 이메일, openLesson_id를 입력받은 뒤 리뷰를 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 409, message = "중복", response = DuplicateErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> registReview(@RequestBody ReviewRegistPostReq reviewRegistPostReq){

        Long reviewId;

        ReviewRegistRes reviewRegistRes = new ReviewRegistRes();

        try {
            reviewId = reviewService.createReview(reviewRegistPostReq);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        } catch (OpenLessonException o){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"openLesson not found"));
        } catch (LessonException l){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"lesson not found"));
        } catch (Exception e){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"unexpected exception"));
        }

        reviewRegistRes.setId(reviewId);
        reviewRegistRes.setMessage("success");
        reviewRegistRes.setStatusCode(200);

        return ResponseEntity.status(200).body(reviewRegistRes);
    }

    @GetMapping("/list/{lessonId}")
    @ApiOperation(value = "강의 리뷰 목록 조회, 로그인 X", notes = "리뷰를 볼 lesson id와 limit(가져올 수), offset(시작지점)을 입력하면 목록을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ReviewPageGetRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> reviewList(@PathVariable Long lessonId, @RequestParam int offset, @RequestParam int limit){

        List<Review> reviewList = new ArrayList<>();
        try {
            reviewList = reviewService.readReview(lessonId, offset, limit);
        } catch (LessonException l){
            return ResponseEntity.status(404).body("lesson not found");
        }

        List<ReviewListGetRes> reviewListGetResList =
                reviewList
                        .stream()
                        .map(r -> new ReviewListGetRes(r))
                        .collect(Collectors.toList());

        Long reviewCount = reviewService.countReview(lessonId);

        ReviewPageGetRes reviewPage = new ReviewPageGetRes();
        reviewPage.setCount(reviewCount);
        reviewPage.setPage(reviewListGetResList);
        reviewPage.setMessage("success");
        reviewPage.setStatusCode(200);

        return ResponseEntity.status(200).body(reviewPage);
    }

    @GetMapping("/list/users/{email}")
    @ApiOperation(value = "내가 쓴 리뷰 목록 조회, 로그인 O", notes = "내 email과 limit(가져올 수), offset(시작지점)을 입력하면 목록을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ReviewPageGetRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> reviewList(@PathVariable String email, @RequestParam int offset, @RequestParam int limit){

        List<Review> myReviewList = new ArrayList<>();

        try {
            myReviewList = reviewService.readMyReview(email, offset, limit);
        } catch (UserException u){
            return ResponseEntity.status(404).body("user not found");
        }

        List<ReviewListGetRes> reviewListGetResList =
                myReviewList
                        .stream()
                        .map(r -> new ReviewListGetRes(r))
                        .collect(Collectors.toList());

        Long reviewCount = reviewService.countMyReview(email);

        ReviewPageGetRes reviewPage = new ReviewPageGetRes();
        reviewPage.setCount(reviewCount);
        reviewPage.setPage(reviewListGetResList);
        reviewPage.setMessage("success");
        reviewPage.setStatusCode(200);

        return ResponseEntity.status(200).body(reviewPage);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "리뷰 삭제, 로그인 O", notes = "리뷰 id를 입력 받아 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> deleteReview(@PathVariable Long id) {

        try {
            reviewService.deleteReview(id);
        } catch (ReviewException r){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "review not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PutMapping()
    @ApiOperation(value = "리뷰 수정, 로그인 O", notes = "내가 한 리뷰 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateReview(@RequestBody ReviewUpdatePutReq reviewUpdatePutReq) {

        try {
            reviewService.updateReview(reviewUpdatePutReq);
        } catch (ReviewException r){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"review not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));

    }


}
