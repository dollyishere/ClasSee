package com.ssafy.api.controller;

import com.ssafy.api.request.NoticeRegisterPostReq;
import com.ssafy.api.response.NoticeListRes;
import com.ssafy.api.service.NoticeService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.board.Notice;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api(value = "공지사항 API", tags = {"Notice"})
@RestController
@RequestMapping("/api/v1/notice")public class NoticeController {

    @Autowired
    NoticeService noticeService;

    @PostMapping()
    @ApiOperation(value = "공지사항 등록", notes = "작성자 이메일, 제목, 내용으로 공지사항 작성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한이 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody NoticeRegisterPostReq noticeRegisterPostReq) {

        try {
            noticeService.createNotice(noticeRegisterPostReq);
        } catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"사용자 권한 없음"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "공지 삭제", notes = "사용자 이메일로 권한 확인 후, id로 해당 공지 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한이 없음")
    })
    public ResponseEntity<? extends BaseResponseBody> withdrawalUser(@RequestParam String email, @RequestParam Long id){

        try {
            noticeService.deleteNotice(email, id);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"사용자 권한이 없음"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));

    }

    @GetMapping()
    @ApiOperation(value = "공지 상세 조회", notes = "공지를 클릭했을 때, 공지의 id를 입력받아 공지 상세정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<?> getNoticeInfo(@RequestParam Long id){

        Notice notice = noticeService.readNotice(id);
        NoticeListRes noticeListRes = new NoticeListRes(notice);

        return ResponseEntity.status(200).body(noticeListRes);

    }

    @GetMapping("/list")
    @ApiOperation(value = "공지 리스트 조회", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<?> getNoticeList(@RequestParam int offset,@RequestParam int limit){

        List<Notice> noticeList = noticeService.readNoticeList(offset, limit);
        List<NoticeListRes> listRes = noticeList.stream().map(n -> new NoticeListRes(n)).collect(Collectors.toList());

        return ResponseEntity.status(200).body(listRes);

    }






}
