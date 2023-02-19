package com.ssafy.api.controller;

import com.ssafy.api.dto.UserEmailPwDto;
import com.ssafy.api.request.UserFindPwPostReq;
import com.ssafy.api.request.UserUpdatePwPutReq;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.api.service.AuthService;
import com.ssafy.api.service.EmailService;
import com.ssafy.common.exception.handler.UserException;
import com.ssafy.common.model.response.*;
import com.ssafy.db.entity.user.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.user.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;
import java.util.Optional;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Autowired
    EmailService emailService;

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>회원가입 정보</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 409, message = "중복 이메일", response = DuplicateErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        if(userService.getUserByAuth(registerInfo.getEmail()) != null) return ResponseEntity.status(409).body(BaseResponseBody.of(409, "DUPLICATE"));

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        userService.createUser(registerInfo.getUserInfoFromReq(registerInfo.getPassword()));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{email}")
    @ApiOperation(value = "유저 삭제, 로그인 O", notes = "유저 정보를 삭제(회원탈퇴)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> withdrawalUser(@PathVariable String email){
        try {
            userService.deleteUser(email);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @GetMapping("/{email}")
    @ApiOperation(value = "회원 본인 정보 조회, 로그인 O", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserInfoGetRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> getUserInfo(@PathVariable String email) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        User user = userService.getUserByAuth(email);

        if(user == null){
            return ResponseEntity.status(404).body("user not found");
        }
        UserInfoGetRes userInfoGetRes = new UserInfoGetRes(user);
        userInfoGetRes.setStatusCode(200);
        userInfoGetRes.setMessage("SUCCESS");

        return ResponseEntity.status(200).body(userInfoGetRes);
    }

    @GetMapping("/duplicate/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 체크", notes = "DB에 이미 nickname이 있는지 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "해당 닉네임을 사용할 수 있음", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "해당 닉네임을 사용할 수 없음", response = DuplicateErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkUserNickname(@PathVariable String nickname) {

        User user = userService.getUserByNickname(nickname);
        if (user == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "duplicate"));

    }

    @GetMapping("/duplicate/email/{email}")
    @ApiOperation(value = "이메일 중복 체크", notes = "DB에 이미 email이 있는지 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "해당 닉네임을 사용할 수 있음", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "해당 닉네임을 사용할 수 없음", response = DuplicateErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkUserEmail(@PathVariable String email) {

        User user = userService.getUserByAuth(email);
        if (user == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "duplicate"));
    }

    @GetMapping("/{email}/check")
    @ApiOperation(value = "비밀번호 찾기, 로그인 X", notes = "<strong>이름과 이메알</strong>을 통해 비밀번호 찾는 메서드.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkUser(@ApiParam(value = "이름, 이메일 정보", required = true) @PathVariable String email, @RequestParam String name) throws Exception {
        UserFindPwPostReq userInfo = UserFindPwPostReq.builder()
                .email(email)
                .name(name)
                .build();

        Optional<Auth> auth = userService.getUserByEmailAndName(userInfo);

        // 입력받은 이메일과 이름으로 찾은 사용자 정보가 없다면 401 return
        if (!auth.isPresent()) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "인증 실패"));

        // 일치하는 사용자가 있다면 해당 email로 코드 전송
        // responsebody에 (200, 코드번호) 전송
        String code = emailService.sendSimpleMessage(userInfo.getEmail());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, code));
    }

    @PutMapping("/{email}/password")
    @ApiOperation(value = "비밀번호 변경, 로그인 O", notes = "<strong>새로운 비밀번호</strong>을 통해 비밀번호 변경 하는 메서드.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> changePw(@PathVariable String email, @RequestBody UserUpdatePwPutReq userUpdatePwPutReq) {
        UserEmailPwDto userInfo = UserEmailPwDto.builder()
                                                .email(email)
                                                .password(userUpdatePwPutReq.getPassword())
                                                .build();
        try {
            userService.updatePassword(userInfo);
            // 입력받은 이메일과 이름으로 찾은 사용자 정보가 없다면 401 return
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
        } catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(405, "SERVER ERROR"));
        }
    }

    @PutMapping("/{email}/nickname")
    @ApiOperation(value = "유저 닉네임 업데이트, 로그인 O", notes = "유저 정보를 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends  BaseResponseBody> updateUserNickname(@PathVariable String email, @RequestParam String nickname) {

        try {
            userService.updateUserNickname(email, nickname);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));
    }

    @PutMapping("/{email}/address")
    @ApiOperation(value = "유저 주소 업데이트, 로그인 O", notes = "유저 정보를 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserAddress(@PathVariable String email, @RequestParam String address) {

        try {
            userService.updateUserAddress(email, address);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));
    }

    @PutMapping("/{email}/phone")
    @ApiOperation(value = "유저 폰번호 업데이트, 로그인 O", notes = "유저 정보를 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserPhone(@PathVariable String email, @RequestParam String phone) {

        try {
            userService.updateUserPhone(email, phone);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));
    }

    @PutMapping("/{email}/description")
    @ApiOperation(value = "유저 자기소개 업데이트, 로그인 O", notes = "유저 정보를 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserDescription(@PathVariable String email, @RequestParam String description) {

        try {
            userService.updateUserDescription(email, description);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));
    }

    @PutMapping("/{email}/img")
    @ApiOperation(value = "유저 이미지 업데이트, 로그인 O", notes = "유저 정보를 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserImg(@PathVariable String email, @RequestParam String img) {

        try {
            userService.updateUserImg(email, img);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"SUCCESS"));
    }

}
