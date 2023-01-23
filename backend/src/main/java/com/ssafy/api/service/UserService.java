package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserSignUpPostReq;
import com.ssafy.db.entity.user.User;

import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	void createUser(Map<String, Object> userRegisterInfo);
	User getUserByAuth(String email);
	void signUpUser(UserSignUpPostReq userSignUpPostReq);
	User getUserByNickname(String nickname);
}
