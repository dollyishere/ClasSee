package com.ssafy.api.request;

import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import com.ssafy.db.entity.user.UserType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

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
	@ApiModelProperty(name="유저 email", example="your_email")
	String email;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	@ApiModelProperty(name="유저 이름", example="your_name")
	String name;
	@ApiModelProperty(name="유저 생년월일(YYYY-MM-DD)", example="your_birth")
	String birth;
	@ApiModelProperty(name="유저 닉네임", example="your_nickname")
	String nickname;
	@ApiModelProperty(name="유저 주소", example="your_address")
	String address;
	@ApiModelProperty(name="유저 연락처", example="your_phone")
	String phone;

	public Map<String, Object> getUserInfoFromReq(String password) {
		Map<String, Object> userInfo = new HashMap<>();

		Auth auth = Auth.builder()
				.email(email)
				.password(password)
				.type(UserType.LOCAL)
				.build();

		User user = User.builder()
				.address(address)
				.birth(birth)
				.createdAt(LocalDateTime.now().toString())
				.name(name)
				.nickname(nickname)
				.phone(phone)
				.role(UserRole.ROLE_USER)
				.build();

		userInfo.put("AUTH", auth);
		userInfo.put("USER", user);
		return userInfo;
	}
}
