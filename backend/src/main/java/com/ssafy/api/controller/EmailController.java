package com.ssafy.api.controller;

import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.api.service.EmailService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.model.response.InvalidErrorResponseBody;
import com.ssafy.common.model.response.NotFoundErrorResponseBody;
import com.ssafy.common.model.response.ServerErrorResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "메일", tags = {"Mail"})
@RequestMapping("/api/v1/mails")
@RestController
public class EmailController {

    @Autowired
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/confirm/{email}")
    @ApiOperation(value = "개설한 강의 목록 조회, 로그인 O", notes = "강사가 본인이 개설한 스케줄 목록을 조회한다. 쿼리 : (DONE[완료], TODO[진행예정])")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AttendLessonInfoListRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> mailConfirm(@PathVariable String email) {
        String code = "INVALID_EMAIL";
        try{
            code = emailService.sendSimpleMessage(email);
        } catch (IllegalAccessException e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, code));
        } catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(500, "SERVER_ERROR"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, code));
    }
}
