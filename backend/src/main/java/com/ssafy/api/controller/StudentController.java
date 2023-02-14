package com.ssafy.api.controller;

import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.AttendOpenLessonInfoDto;
import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.api.service.LessonService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.model.response.InvalidErrorResponseBody;
import com.ssafy.common.model.response.NotFoundErrorResponseBody;
import com.ssafy.common.model.response.ServerErrorResponseBody;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * 수강생 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "수강생 API", tags = {"Student"})
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    UserService userService;
    @Autowired
    LessonService lessonService;
    @GetMapping("/{email}/lessons")
    @ApiOperation(value = "신청한 강의 목록 조회, 로그인 O", notes = "수강생이 신청한 강의 목록을 조회한다. 쿼리(DONE[완료], TODO[진행]")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> getLessonListInfo(
            @PathVariable String email,
            @RequestParam String query,
            @RequestParam int limit,
            @RequestParam int offset
    ) {
        User user = userService.getUserByAuth(email);

        if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));
        Long userId = user.getAuth().getId();

        // 해당 유저가 신청한 강의 리스트
        AttendLessonInfoListRes res = lessonService.getAttendLessonListByStudent(userId, query, limit, offset);

        return ResponseEntity.status(200).body(AttendLessonInfoListRes.of(200, "SUCCESS", res));
    }
}
