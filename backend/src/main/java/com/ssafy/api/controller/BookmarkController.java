package com.ssafy.api.controller;

import com.ssafy.api.request.BookmarkRegisterReq;
import com.ssafy.api.service.BookmarkService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "북마크 API", tags = {"Bookmark"})
@RestController
@RequestMapping("/api/v1/bookmark")
public class BookmarkController {
    @Autowired
    BookmarkService bookmarkService;

    @PostMapping()
    @ApiOperation(value = "북마크 등록", notes = "<strong>회원 정보와 강의 정보</strong>를 통해 북마크를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerBookmark(
            @RequestBody @ApiParam(value = "사용자 이메일과 강의 아이디", required = true) BookmarkRegisterReq requestInfo) {

        bookmarkService.create(requestInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "북마크 삭제", notes = "<strong>회원 정보와 강의 정보</strong>를 통해 북마크를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteBookmark(@RequestParam Long lessonId, @RequestParam String email) {
        bookmarkService.delete(email, lessonId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"성공"));

    }
}
