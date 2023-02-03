package com.ssafy.api.controller;

import com.querydsl.core.Tuple;
import com.ssafy.api.dto.LessonInfoDto;
import com.ssafy.api.dto.OpenLessonInfoDto;
import com.ssafy.api.request.LessonRegisterPostReq;
import com.ssafy.api.request.LessonScheduleRegisterPostReq;
import com.ssafy.api.response.LessonDetailsRes;
import com.ssafy.api.response.LessonIdRes;
import com.ssafy.api.response.LessonInfoListRes;
import com.ssafy.api.response.LessonSchedulsRes;
import com.ssafy.api.service.LessonService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.DateFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "강의 API", tags = {"Lesson"})
@RestController
@RequestMapping("/api/v1/lessons")
public class LessonController {
    @Autowired
    LessonService lessonService;

    @Autowired
    UserService userService;

    @PostMapping()
    @ApiOperation(value = "강의 등록", notes = "<strong>강의 정보</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerLesson(
            @RequestBody @ApiParam(value = "강의 등록 정보", required = true) LessonRegisterPostReq requestInfo) {
        /*[lessonInfo]
            1. 강사 이메일
            2. 강의명
            3. 강의 소개
            4. List<강의 소개 사진>
            5. List<준비물*(사진, 설명)> 등록
            6. List<커리큘럼> 등록
            7. 예상 강의 시간( 강의 소요 시간 )
            8. 참여 가능 인원
            9. 강의 가격
        */
        User user = userService.getUserByAuth(requestInfo.getEmail());
        if (user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "NOT FOUND"));

        Long lessonId = lessonService.createLesson(requestInfo.getLessonInfoFromReq(user));

        return ResponseEntity.status(200).body(LessonIdRes.of(200, "SUCCESS", lessonId));
    }

    @PutMapping()
    @ApiOperation(value = "강의 수정", notes = "<strong>강의 정보</strong>를 수정 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateLesson(
            @RequestBody @ApiParam(value = "강의 등록 정보", required = true) LessonRegisterPostReq requestInfo) {
        User user = userService.getUserByAuth(requestInfo.getEmail());
        if (user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "NOT FOUND"));

        Long lessonId = lessonService.updateLesson(requestInfo.getLessonInfoFromReq(user));

        return ResponseEntity.status(200).body(LessonIdRes.of(200, "SUCCESS", lessonId));
    }

    @PostMapping("/schedules")
    @ApiOperation(value = "강의 스케줄 등록", notes = "<strong>강의 진행 정보</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerSchedule(
            @RequestBody @ApiParam(value = "강의 등록 정보", required = true) LessonScheduleRegisterPostReq requestInfo) {
        /*[requestInfo]
            1. 강의 아이디(lessonId)
            2. 강의 일자(regDate)
            3. 강의 시작 시간(startTime)
            4. 강의 종료 시간(endTime)
        */
        try {
            lessonService.createSchedule(requestInfo.getOpenLessonInfoFromReq(requestInfo));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "SERVER ERROR"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    @GetMapping("/details/{lessonId}")
    @ApiOperation(value = "강의 상세 화면", notes = "강의정보, 강사정보, 강의 일정 정보를 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getLessonDetails(@PathVariable Long lessonId) {
        LessonDetailsRes lessonDetailsRes = lessonService.getLessonDetails(lessonId);

        return ResponseEntity.status(200).body(LessonDetailsRes.of(200, "SUCCESS", lessonDetailsRes));
    }

    @GetMapping("/details/{lessonId}/schedules/{regDate}")
    @ApiOperation(value = "강의 스케줄 조회", notes = "강의 아이디와 날짜(yyyy-MM-dd)를 통해 개설 강의 리스트 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getLessonSchedules(@PathVariable Long lessonId, @ApiParam(example = "yyyy-MM-dd") @PathVariable String regDate) {
        LocalDate parseDate = LocalDate.parse(regDate, DateTimeFormatter.ISO_DATE);
        LessonSchedulsRes lessonSchedulsRes = lessonService.getLessonSchedules(lessonId, parseDate);

        return ResponseEntity.status(200).body(LessonSchedulsRes.of(200, "SUCCESS", lessonSchedulsRes));
    }

    @GetMapping("/recommands")
    @ApiOperation(value = "추천 강의 리스트", notes = "평점이 높은 강의 12개를 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getRecommandList() {
        // 평점이 가장 높은 상위 12개의 레슨 아이디 리스트
        List<Lesson> popularLessonList = lessonService.getPopularLessonList();

        // 받아온 레슨 아이디 리스트를 객체로 전환
        List<LessonInfoDto> lessonList = lessonService.setLessonProperty(popularLessonList);

        LessonInfoListRes res = LessonInfoListRes.builder()
                                                 .lessonInfoList(lessonList)
                                                 .build();
        return ResponseEntity.status(200).body(LessonInfoListRes.of(200, "SUCCESS", res));
    }
}
