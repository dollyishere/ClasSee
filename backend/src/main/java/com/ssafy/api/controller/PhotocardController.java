package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.api.response.PageGetRes;
import com.ssafy.api.response.PhotocardListGetRes;
import com.ssafy.api.response.PhotocardPageGetRes;
import com.ssafy.api.service.PhotocardService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.model.response.NotFoundErrorResponseBody;
import com.ssafy.db.entity.board.Photocard;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Api(value = "포토카드 API", tags = {"Photocard"})
@RestController
@RequestMapping("/api/v1/photocard")
public class PhotocardController {

    @Autowired
    PhotocardService photocardService;

    @PostMapping()
    @ApiOperation(value = "포토카드 등록, 로그인 O", notes = "포토카드 정보 입력 후 포토카드 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> registPhotocard(@RequestBody PhotocardRegistPostReq photocardRegistPostReq) {

        photocardService.createPhotocard(photocardRegistPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));

    }

    @PostMapping("/likes")
    @ApiOperation(value = "좋아요 등록, 로그인 O", notes = "좋아요를 누른 사용자 email, 포토카드 id를 입력 받아 좋아요 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> registLikes(@RequestParam String email, @RequestParam Long id) {

        photocardService.createLikes(email, id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));

    }


    @GetMapping("/list")
    @ApiOperation(value = "포토카드 리스트, 로그인 X", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수," +
            " likes_count는 해당 포토카드의 좋아요 총개수, likes_check는 true면 내가 좋아요 누른 포토카드이고 false면 안누른 포토카드")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = PhotocardPageGetRes.class)
    })
    public ResponseEntity<?> photocardList(@RequestParam int offset, @RequestParam int limit, String email){

        List<Photocard> photocardList =
                photocardService
                .readPhotocardList(offset, limit);

        List<PhotocardListGetRes> photocardListGetResList = new ArrayList<>();

        if(email != null) {
            photocardListGetResList =
                    photocardList
                            .stream()
                            .map(p -> new PhotocardListGetRes(p,
                                    photocardService.countLikes(p),
                                    photocardService.checkLikes(email, p.getId())))
                            .collect(Collectors.toList());
        } else {
            photocardListGetResList =
                    photocardList
                            .stream()
                            .map(p -> new PhotocardListGetRes(p,
                                    photocardService.countLikes(p),
                                    false))
                            .collect(Collectors.toList());
        }

        Long photocardCount = photocardService.photocardCount();

        PhotocardPageGetRes photocardPage = new PhotocardPageGetRes();

        photocardPage.setCount(photocardCount);
        photocardPage.setPage(photocardListGetResList);

        return ResponseEntity.status(200).body(photocardPage);
    }

    @GetMapping("/list/{email}")
    @ApiOperation(value = "나의 포토카드 리스트, 로그인 O", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수," +
            " likes_count는 해당 포토카드의 좋아요 총개수, likes_check는 true면 내가 좋아요 누른 포토카드이고 false면 안누른 포토카드")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = PhotocardPageGetRes.class)
    })
    public ResponseEntity<?> photocardMyList(@RequestParam int offset, @RequestParam int limit, @PathVariable String email){

        List<Photocard> photocardList =
                photocardService
                        .readMyPhotocardList(offset, limit, email);

        List<PhotocardListGetRes> photocardListGetResList =
                photocardList
                        .stream()
                        .map(p -> new PhotocardListGetRes(p,
                                photocardService.countLikes(p),
                                photocardService.checkLikes(email, p.getId())))
                        .collect(Collectors.toList());

        Long photocardCount = photocardService.myPhotocardCount(email);

        PhotocardPageGetRes photocardPage = new PhotocardPageGetRes();

        photocardPage.setCount(photocardCount);
        photocardPage.setPage(photocardListGetResList);

        return ResponseEntity.status(200).body(photocardPage);
    }

    @DeleteMapping()
    @ApiOperation(value = "포토 카드 삭제, 로그인 O", notes = "포토 카드 id를 입력 받아 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> deletePhotocard(@RequestParam Long id) {

        photocardService.deletePhotocard(id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    @DeleteMapping("/likes")
    @ApiOperation(value = "좋아요 취소, 로그인 O", notes = "좋아요를 취소할 사용자 email, 포토카드 id를 입력 받아 좋아요 취소(삭제)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> deleteLikes(@RequestParam String email, @RequestParam Long id) {

        photocardService.deleteLikes(email, id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }



}
