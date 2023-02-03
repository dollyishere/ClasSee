package com.ssafy.api.controller;

import com.ssafy.api.dto.AttendLessonInfoDto;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.response.AttendLessonInfoListRes;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonInfoListRes;
import com.ssafy.api.service.LessonService;
import com.ssafy.api.service.TeacherService;
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



    @GetMapping("/lessons")
    @ApiOperation(value = "개설한 강의 목록 조회", notes = "강사가 본인이 개설한 강의 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getLessonListInfo(@RequestParam String email) {
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

        if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "사용자 정보 없음"));
        Long userId = user.getAuth().getId();

        // 해당 유저가 개설한 강의 리스트
        List<Lesson> lessonList = teacherService.getLessonList(user);
        if(lessonList == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "개설 강의 없음"));

        List<LessonInfoDto> lessonInfoList =  lessonService.setLessonProperty(userId, lessonList);
        LessonInfoListRes res = LessonInfoListRes.builder()
                                                 .lessonInfoList(lessonInfoList)
                                                 .build();
        return ResponseEntity.status(200).body(LessonInfoListRes.of(200, "SUCCESS", res));
    }

    @GetMapping("/lessons/{email}/")
    @ApiOperation(value = "개설한 강의 목록 조회", notes = "강사가 본인이 개설한 스케줄 목록을 조회한다. 쿼리 : (DONE[완료], TODO[진행예정])")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getLessonListInfoPaging(@PathVariable String email, @RequestParam String query, @RequestParam int limit, @RequestParam int offset) {
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

        if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "사용자 정보 없음"));
        Long userId = user.getAuth().getId();

        List<AttendLessonInfoDto> lessonList = lessonService.getAttendLessonList(userId, query, "T", limit, offset);
        if(lessonList == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "개설 강의 없음"));

        AttendLessonInfoListRes res = AttendLessonInfoListRes.builder()
                .lessonInfoList(lessonList)
                .build();
        return ResponseEntity.status(200).body(AttendLessonInfoListRes.of(200, "SUCCESS", res));
    }
}
