package com.ssafy.api.controller;

import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.service.LessonService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "결제 API", tags = {"Payment"})
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    @Autowired
    UserService userService;

    @Autowired
    LessonService lessonService;

    @GetMapping("/{openLessonId}")
    @ApiOperation(value = "결제 진행 화면", notes = "강의정보, 강사정보, 결제 진행 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAttendInfo(@PathVariable Long openLessonId, @RequestParam String email) {
        User user = userService.getUserByAuth(email);
        if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "NOT FOUND"));


//        return ResponseEntity.status(200).body(LessonDetailsRes.of(200, "SUCCESS", lessonDetailsRes));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "TEST"));
    }
}
