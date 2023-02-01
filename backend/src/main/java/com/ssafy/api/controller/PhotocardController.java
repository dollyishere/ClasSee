package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.api.response.PageGetRes;
import com.ssafy.api.response.PhotocardListGetRes;
import com.ssafy.api.service.PhotocardService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.board.Photocard;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api(value = "포토카드 API", tags = {"Photocard"})
@RestController
@RequestMapping("/api/v1/photocard")
public class PhotocardController {

    @Autowired
    PhotocardService photocardService;

    @PostMapping()
    @ApiOperation(value = "포토카드 등록", notes = "포토카드 정보 입력 후 포토카드 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<? extends BaseResponseBody> registPhotocard(@RequestBody PhotocardRegistPostReq photocardRegistPostReq) {

        photocardService.createPhotocard(photocardRegistPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"성공"));

    }

    @GetMapping("/list")
    @ApiOperation(value = "포토카드 리스트", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<?> photocardList(@RequestParam int offset, @RequestParam int limit, @RequestParam String email){

        List<Photocard> photocardList =
                photocardService
                .readPhotocardList(offset, limit, email);

        List<PhotocardListGetRes> photocardListGetResList =
                photocardList
                        .stream()
                        .map(p -> new PhotocardListGetRes(p))
                        .collect(Collectors.toList());

        Long phtocardCount = photocardService.photocardCount(email);

        PageGetRes photocardPage = new PageGetRes();

        photocardPage.setCount(phtocardCount);
        photocardPage.setPage(photocardListGetResList);

        return ResponseEntity.status(200).body(photocardPage);
    }

    @DeleteMapping()
    @ApiOperation(value = "포토 카드 삭제", notes = "포토 카드 id를 입력 받아 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 401, message = "invalid")
    })
    public ResponseEntity<? extends BaseResponseBody> deletePhotocard(@RequestParam String email, @RequestParam Long id) {

        photocardService.deletePhotocard(email, id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }



}