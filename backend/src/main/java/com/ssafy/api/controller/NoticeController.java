package com.ssafy.api.controller;

import com.ssafy.api.request.NoticeCreatePostReq;
import com.ssafy.api.service.NoticeService;
import com.ssafy.api.service.UserService;
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

@Api(value = "공지사항 API", tags = {"Notice"})
@RestController
@RequestMapping("/api/v1/notice")public class NoticeController {

    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService userService;

    @PostMapping()
    @ApiOperation(value = "공지사항 등록", notes = "작성자 이메일, 제목, 내용으로 공지사항 작성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한이 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody NoticeCreatePostReq noticeCreatePostReq) {

        try {
            noticeService.createNotice(noticeCreatePostReq);
        } catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"사용자 권한 없음"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }




}
