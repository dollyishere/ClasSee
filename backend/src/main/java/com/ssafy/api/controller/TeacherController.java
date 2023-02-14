package com.ssafy.api.controller;

import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonInfoListRes;
import com.ssafy.api.service.LessonService;
import com.ssafy.api.service.TeacherService;
import com.ssafy.common.model.response.InvalidErrorResponseBody;
import com.ssafy.common.model.response.NotFoundErrorResponseBody;
import com.ssafy.common.model.response.ServerErrorResponseBody;
import com.ssafy.db.entity.lesson.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.user.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "강사 API", tags = {"Teacher"})
@RestController
@RequestMapping("/api/v1/teachers")
public class TeacherController {
    @Autowired
    TeacherService teacherService;
    @Autowired
    UserService userService;
    @Autowired
    LessonService lessonService;
    @GetMapping("/{email}/lessons")
    @ApiOperation(value = "개설한 강의 목록 조회, 로그인 O", notes = "강사가 본인이 개설한 스케줄 목록을 조회한다. 쿼리 : (DONE[완료], TODO[진행예정])")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AttendLessonInfoListRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getLessonListInfoPaging(@PathVariable String email, @RequestParam int limit, @RequestParam int offset) {
        /*
        리턴 값
        강의 리스트
            - 강의명
            - 소요시간
            - 카테고리
        - 이미지
        - 별점 평균
        */
        User user = userService.getUserByAuth(email);

        if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));
        Long userId = user.getAuth().getId();

        AttendLessonInfoListRes res = lessonService.getAttendLessonListByTeacher(userId, limit, offset);
        if(res.getLessonInfoList() == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "LESSON NOT FOUND"));

        return ResponseEntity.status(200).body(AttendLessonInfoListRes.of(200, "SUCCESS", res));
    }

    @DeleteMapping("/{email}/lessons/{lessonId}")
    @ApiOperation(value = "강의 삭제", notes = "등록한 강의를 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "FAILED_CAUSE_EXISTS_STUDENT", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "NOT FOUND", response = NotFoundErrorResponseBody.class),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteLesson(@PathVariable String email, @PathVariable Long lessonId){
        User user = userService.getUserByAuth(email);
        if(user == null) return ResponseEntity.status(200).body(BaseResponseBody.of(404, "NOT FOUND"));

        int isDelete = lessonService.deleteLesson(lessonId);
        if(isDelete == 0) return ResponseEntity.status(200).body(BaseResponseBody.of(401, "FAILED_CAUSE_EXISTS_STUDENT"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    @DeleteMapping("/{email}/lessons/{lessonId}/{openLessonId}")
    @ApiOperation(value = "강의 스케줄 삭제", notes = "강의 스케줄을 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "SUCCESS", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "FAILED_CAUSE_EXISTS_STUDENT", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "NOT FOUND", response = NotFoundErrorResponseBody.class),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteOpenLesson(@PathVariable String email, @PathVariable Long openLessonId){
        User user = userService.getUserByAuth(email);
        if(user == null) return ResponseEntity.status(200).body(BaseResponseBody.of(404, "NOT FOUND"));

        int isDelete = lessonService.deleteOpenLesson(openLessonId);
        if(isDelete == 0) return ResponseEntity.status(200).body(BaseResponseBody.of(401, "FAILED_CAUSE_EXISTS_STUDENT"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }
}
