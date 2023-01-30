package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.api.service.PhotocardService;
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

@Api(value = "포토카드 API", tags = {"Photocard"})
@RestController
@RequestMapping("/api/v1/photocard")
public class PhotocardController {

    @Autowired
    PhotocardService photocardService;

    @PostMapping()
    @ApiOperation(value = "게시글 등록", notes = "작성자 이메일, 제목, 내용, 이미지 주소 입력 후 게시글 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<? extends BaseResponseBody> registPhotocard(@RequestBody PhotocardRegistPostReq photocardRegistPostReq) {

        photocardService.createPhotocard(photocardRegistPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"성공"));

    }



}
