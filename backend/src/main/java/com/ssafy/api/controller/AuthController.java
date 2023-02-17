package com.ssafy.api.controller;

import com.ssafy.api.dto.KakaoUserDto;
import com.ssafy.api.request.UserLogoutPostReq;
import com.ssafy.api.response.UserSaltRes;
import com.ssafy.api.service.*;
import com.ssafy.common.model.response.InvalidErrorResponseBody;
import com.ssafy.common.model.response.NotFoundErrorResponseBody;
import com.ssafy.common.model.response.ServerErrorResponseBody;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.entity.user.UserType;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.user.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@EnableWebSecurity
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Value("${jwt.expiration.atk}")
	Integer atkExpirationTime;

	@Value("${jwt.expiration.rtk}")
	Integer rtkExpirationTime;
	@Autowired
	UserService userService;
	@Autowired
	BookmarkService bookmarkService;

	@Autowired
	AuthService authService;

	@Autowired
	RedisService redisService;

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	KakaoService kakaoService;


	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>이메일과 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> login(
			@RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo, HttpServletResponse res) {
		String email = loginInfo.getEmail();
		String password = loginInfo.getPassword();

		User user = userService.getUserByAuth(email);
		if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		if (!(password.equals(user.getAuth().getPassword()) && user.getAuth().getType().equals(UserType.LOCAL))) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "INVALID"));

		// 프론트로 보내줄 access, refresh token 생성
		String accessToken = JwtTokenUtil.getToken(JwtTokenUtil.atkExpirationTime, email);
		String refreshToken = JwtTokenUtil.getToken(JwtTokenUtil.rtkExpirationTime, email);

		UserLoginPostRes userLoginPostRes = UserLoginPostRes.builder()
				.email(user.getAuth().getEmail())
				.name(user.getName())
				.nickname(user.getNickname())
				.address(user.getAddress())
				.birth(user.getBirth())
				.phone(user.getPhone())
				.point(user.getPoint())
				.img(user.getImg())
				.description(user.getDescription())
				.userRole(user.getRole())
				.build();

			/*
				redis db에 저장
				KEY: 사용자 이메일
				VALUE: refresh_token
			*/
		redisService.setValues(refreshToken, user.getAuth().getEmail());

		try {
			res.setHeader(JwtTokenUtil.HEADER_STRING, JwtTokenUtil.TOKEN_PREFIX + accessToken);
			res.setHeader("Refresh-Token", refreshToken);
		} catch (Exception e){
			return ResponseEntity.status(403).body(BaseResponseBody.of(401, "TOKEN RESPONSE FAILED"));
		}
		// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
		return ResponseEntity.ok(UserLoginPostRes.of(200, "SUCCESS", userLoginPostRes));
	}

	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃", notes = "<strong>토큰 정보</strong>을 통해 로그아웃 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
	})
	public ResponseEntity<?> logout(@RequestHeader("Authorization") String accessToken, @RequestParam String email) {
		try {
			authService.logout(email, accessToken.substring(7));
			return ResponseEntity.ok(BaseResponseBody.of(200, "SUCCESS"));
		} catch (ExpiredJwtException e){
			return ResponseEntity.status(403).body(BaseResponseBody.of(403, "EXPIRED TOKEN"));
		} catch (Exception e){
			e.printStackTrace();
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "SERVER ERROR"));
		}
	}

	@GetMapping("/salt")
	@ApiOperation(value = "salt 요청 api", notes = "사용자의 salt 반환")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserSaltRes.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> findSalt(@RequestParam String email) {
		User user = userService.getUserByAuth(email);
		if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));

		return ResponseEntity.status(200).body(UserSaltRes.of(200, "SUCCESS", user.getAuth().getSalt()));
	}

	@GetMapping("/token")
	@ApiOperation(value = "accessToken 요청 api", notes = "사용자의 accessToken 반환")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserSaltRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> getAccessToken(@RequestHeader(JwtTokenUtil.HEADER_STRING) String refreshToken, @RequestParam String email, HttpServletResponse res) {
		User user = userService.getUserByAuth(email);
		if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));

		if (!redisService.getValues(email).equals(refreshToken.substring(7))) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "INVALID TOKEN"));

		// 프론트로 보내줄 access, refresh token 생성
		String afterATK = JwtTokenUtil.getToken(JwtTokenUtil.atkExpirationTime, email);
		String afterRTK = JwtTokenUtil.getToken(JwtTokenUtil.rtkExpirationTime, email);

		redisService.setValues(afterRTK, email);
		try {
			res.setHeader(JwtTokenUtil.HEADER_STRING, JwtTokenUtil.TOKEN_PREFIX + afterATK);
			res.setHeader("Refresh-Token", afterRTK);
		} catch (Exception e){
			System.out.println(e.getStackTrace());
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "TOKEN RESPONSE FAILED"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
	}

	/*

		로그인 시에만 접근 가능한 api 테스트용 API
	*/
	@GetMapping("/test")
	@ApiOperation(value = "권한 테스트", notes = "로그인 접근 여부")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> test() {
		return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", UserLoginPostRes.builder().build()));
	}

	@GetMapping("/kakao")
	@ApiOperation(value = "Kakao login api", notes = "code 반환")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserSaltRes.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = NotFoundErrorResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> getKakaoCode(@RequestParam String code, HttpServletResponse res) {
		KakaoUserDto reqUser = kakaoService.getKakaoInfo(code);
		HashMap<String, Object> kakaoUser = kakaoService.getUserInfo(reqUser.getAccessToken());

		if(kakaoUser == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));
		String email = kakaoUser.get("email").toString();

		User isExist = userService.getUserByAuth(email);

		// 카카오 유저 이메일로 가입된 유저가 없다면.
		if(isExist == null) {
			String name = (String)kakaoUser.get("nickname");
			Auth auth = Auth.builder()
					.email(email)
					.type(UserType.KAKAO)
					.build();
			User user = User
					.builder()
					.name(name)
					.nickname(name)
					.auth(auth)
					.point(0l)
					.role(UserRole.ROLE_USER)
					.createdAt(LocalDateTime.now().toString())
					.build();
			Map<String, Object> userInfo = new HashMap<>();
			userInfo.put("AUTH", auth);
			userInfo.put("USER", user);

			userService.createUser(userInfo);

		}
		// 로그인 처리
		String accessToken = JwtTokenUtil.getToken(JwtTokenUtil.atkExpirationTime, email);
		String refreshToken = JwtTokenUtil.getToken(JwtTokenUtil.rtkExpirationTime, email);

		User user = userService.getUserByAuth(email);
		if(user == null) return ResponseEntity.status(404).body(BaseResponseBody.of(404, "USER NOT FOUND"));

		UserLoginPostRes userLoginPostRes = UserLoginPostRes.builder()
				.email(user.getAuth().getEmail())
				.name(user.getName())
				.nickname(user.getNickname())
				.address(user.getAddress())
				.birth(user.getBirth())
				.phone(user.getPhone())
				.point(user.getPoint())
				.img(user.getImg())
				.description(user.getDescription())
				.userRole(user.getRole())
				.build();

		redisService.setValues(refreshToken, email);

		try {
			res.setHeader(JwtTokenUtil.HEADER_STRING, JwtTokenUtil.TOKEN_PREFIX + accessToken);
			res.setHeader("Refresh-Token", refreshToken);
		} catch (Exception e){
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "TOKEN RESPONSE FAILED"));
		}

		return ResponseEntity.ok(UserLoginPostRes.of(200, "SUCCESS", userLoginPostRes));
	}
}