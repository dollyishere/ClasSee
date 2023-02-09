package com.ssafy.api.service;

import com.ssafy.api.dto.UserEmailPwDto;
import com.ssafy.api.request.UserFindPwPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.common.exception.handler.UserException;
import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.User;

import java.util.Map;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	void createUser(Map<String, Object> userRegisterInfo);
	User getUserByAuth(String email);

	User getUserByNickname(String nickname);

	Optional<Auth> getUserByEmailAndName(UserFindPwPostReq userInfo);

	void updatePassword(UserEmailPwDto userInfo);

	void updateUserNickname(String email, String nickname) throws UserException;
	void updateUserPhone(String email, String phone) throws UserException;
	void updateUserAddress(String email, String address) throws UserException;
	void updateUserDescription(String email, String description) throws UserException;
	void updateUserImg(String email, String img) throws UserException;
	void deleteUser(String email) throws UserException;

}
