package com.ssafy.api.controller;

import com.ssafy.api.request.UserLogoutPostReq;
import com.ssafy.api.service.AuthService;
import com.ssafy.api.service.RedisService;
import com.ssafy.common.auth.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@EnableWebSecurity
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;

	@Autowired
	AuthService authService;

	@Autowired
	RedisService redisService;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenUtil jwtTokenUtil;


	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>이메일과 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String email = loginInfo.getEmail();
		String password = loginInfo.getPassword();

		User user = userService.getUserByAuth(email);

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (passwordEncoder.matches(password, user.getAuth().getPassword())) {

			// 프론트로 보내줄 access, refresh token 생성
			String accessToken = JwtTokenUtil.getToken(JwtTokenUtil.atkExpirationTime, email);
			String refreshToken = JwtTokenUtil.getToken(JwtTokenUtil.rtkExpirationTime, email);

			/*
				redis db에 저장
				KEY: 사용자 이메일
				VALUE: refresh_token
			*/
			redisService.setValues(refreshToken, user.getAuth().getEmail());

			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//            authService.saveRefreshToken(email, refreshToken);
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", accessToken, refreshToken));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null, null));
	}

	/*

		로그인 시에만 접근 가능한 api 테스트용 API
	*/
	@GetMapping("/test")
	@ApiOperation(value = "권한 테스트", notes = "로그인 접근 여부")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> test() {
		return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", "test", "test"));
	}
}
