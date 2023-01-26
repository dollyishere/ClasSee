package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.NoticeRegisterPostReq;
import com.ssafy.api.service.ArticleService;
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

@Api(value = "게시글 API", tags = {"Article"})
@RestController
@RequestMapping("/api/v1/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @PostMapping()
    @ApiOperation(value = "게시글 등록", notes = "작성자 이메일, 제목, 내용, 이미지 주소 입력 후 게시글 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한이 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody ArticleRegisterPostReq articleRegisterPostReq) {

        articleService.createArticle(articleRegisterPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"등록 성공"));

    }



}
