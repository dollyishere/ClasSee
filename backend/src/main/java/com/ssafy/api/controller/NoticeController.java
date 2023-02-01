package com.ssafy.api.controller;

import com.ssafy.api.request.NoticeRegisterPostReq;
import com.ssafy.api.request.NoticeUpdatePutReq;
import com.ssafy.api.response.NoticeInfoRes;
import com.ssafy.api.response.NoticeListRes;
import com.ssafy.api.response.PageGetRes;
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
    @ApiOperation(value = "공지사항 등록", notes = "작성자 이메일, 제목, 내용으로 권한 확인 후 공지사항 작성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> registNotice(@RequestBody NoticeRegisterPostReq noticeRegisterPostReq) {

        noticeService.createNotice(noticeRegisterPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "공지사항 삭제", notes = "사용자 이메일로 권한 확인 후, id로 해당 공지 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteNotice(@RequestParam String email, @RequestParam Long id){

        noticeService.deleteNotice(email, id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));

    }

    @GetMapping()
    @ApiOperation(value = "공지 상세 조회", notes = "공지를 클릭했을 때, 공지의 id를 입력받아 공지 상세정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getNoticeInfo(@RequestParam Long id){

        Notice notice = noticeService.readNotice(id);
        NoticeInfoRes noticeInfoRes = new NoticeInfoRes(notice);

        return ResponseEntity.status(200).body(noticeInfoRes);

    }

    @GetMapping("/list")
    @ApiOperation(value = "공지 리스트 조회", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getNoticeList(@RequestParam int offset, @RequestParam int limit){

        List<Notice> noticeList = noticeService.readNoticeList(offset, limit);
        List<NoticeListRes> listRes = noticeList.stream().map(n -> new NoticeListRes(n)).collect(Collectors.toList());
        Long noticeCount = noticeService.noticeCount();

        PageGetRes noticePage = new PageGetRes();
        noticePage.setPage(listRes);
        noticePage.setCount(noticeCount);

        return ResponseEntity.status(200).body(noticePage);

    }

    @PutMapping()
    @ApiOperation(value = "공지사항 수정", notes = "유저 권한 확인 후 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> noticeUpdate(@RequestBody NoticeUpdatePutReq noticeUpdatePutReq){

        noticeService.updateNotice(noticeUpdatePutReq);

        return ResponseEntity.status(200).body("success");

    }


}
