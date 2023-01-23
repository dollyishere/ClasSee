package com.ssafy.api.controller;

import com.ssafy.api.request.UserSignUpPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.user.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>회원가입 정보</strong>를 통해 회원가입 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		userService.createUser(registerInfo.getUserInfoFromReq(registerInfo.getPassword()));

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String email = userDetails.getUsername();
		User user = userService.getUserByAuth(email);

		return ResponseEntity.status(200).body(UserRes.of(user));
	}

	@GetMapping("/check/{nickname}")
	@ApiOperation(value = "닉네임 중복 체크", notes = "DB에 이미 nickname이 있는지 체크")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> checkUserNickname(@PathVariable String nickname) {

		User user = userService.getUserByNickname(nickname);
		if(user == null) {
			return ResponseEntity.status(200).body(true);
		}

		return ResponseEntity.status(200).body(false);

	}

	@GetMapping("/check/{email}")
	@ApiOperation(value = "이메일 중복 체크", notes = "DB에 이미 email이 있는지 체크")
	@ApiResponses({
			@ApiResponse(code = 200, message = "해당 이메일이 이미 존재함"),
			@ApiResponse(code = 201, message = "해당 이메일을 사용할 수 있음")
	})
	public ResponseEntity<Boolean> checkUserEmail(@PathVariable String email){

		User user = userService.getUserByAuth(email);
		if(user == null){
			return ResponseEntity.status(201).body(true);
		}
		return ResponseEntity.status(200).body(false);
	}

	@PostMapping("/sign-up")
	@ApiOperation(value = "회원 가입", notes = "회원 가입 성공 여부 확인")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> signUp(@RequestBody UserSignUpPostReq userSignUpPostReq){

		userService.signUpUser(userSignUpPostReq);

		return ResponseEntity.status(200).body(true);

	}


}
