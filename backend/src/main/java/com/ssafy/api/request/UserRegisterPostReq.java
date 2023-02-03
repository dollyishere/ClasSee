package com.ssafy.api.request;

import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.entity.user.UserType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 email", example="사용자 이메일")
	String email;
	@ApiModelProperty(name="유저 Password", example="비밀번호")
	String password;
	@ApiModelProperty(name="유저 이름", example="사용자 이름")
	String name;
	@ApiModelProperty(name="유저 생년월일(YYYY-MM-DD)", example="생년월일 [yyyy-MM-dd]")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	LocalDate birth;
	@ApiModelProperty(name="유저 닉네임", example="닉네임")
	String nickname;
	@ApiModelProperty(name="유저 주소", example="주소")
	String address;
	@ApiModelProperty(name="유저 연락처", example="연락처")
	String phone;

	@ApiModelProperty(name="유저 salt", example="salt 정보")
	String salt;

	public Map<String, Object> getUserInfoFromReq(String password) {
		Map<String, Object> userInfo = new HashMap<>();

		Auth auth = Auth.builder()
				.email(email)
				.password(password)
				.type(UserType.LOCAL)
				.salt(salt)
				.build();

		User user = User.builder()
				.address(address)
				.birth(birth)
				.createdAt(LocalDateTime.now().toString())
				.name(name)
				.nickname(nickname)
				.phone(phone)
				.point(0l)
				.role(UserRole.ROLE_USER)
				.build();

		userInfo.put("AUTH", auth);
		userInfo.put("USER", user);
		return userInfo;
	}
}
