package com.ssafy.api.service;

import com.ssafy.api.request.UserSignUpPostReq;
import com.ssafy.db.entity.user.Auth;
import com.ssafy.db.entity.user.UserType;
import com.ssafy.db.repository.AuthRepository;
import com.ssafy.db.repository.AuthRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	AuthRepositorySupport authRepositorySupport;

	@Autowired
	AuthRepository authRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	/*
		회원 가입 요청 request의 정보를 통해 진행
		AUTH, USER 테이블에 데이터 삽입을 위해 Map<String, Object> 객체에 "AUTH", "USER"로 객체 전달받음

		[AUTH] PasswordEncoder를 통해 비밀번호 암호화 후 DB에 save
		[USER] auth객체의 auth_id를 받아 저장 후 DB에 save
	*/
	@Override
	public void createUser(Map<String, Object> userRegisterInfo) {
		Auth auth = (Auth) userRegisterInfo.get("AUTH");
		auth.setPassword(passwordEncoder.encode(auth.getPassword()));
		authRepositorySupport.save(auth);

		User user = (User) userRegisterInfo.get("USER");
		user.setAuth(auth);
		userRepositorySupport.save(user);
	}

	@Override
	@Transactional
	public void signUpUser(UserSignUpPostReq userSignUpPostReq) {
		Auth auth = Auth.builder()
				.email(userSignUpPostReq.getEmail())
				.password(userSignUpPostReq.getPassword())
				.type(UserType.LOCAL).build();

		authRepositorySupport.save(auth);

		User user = User.builder()
				.name(userSignUpPostReq.getName())
				.nickname(userSignUpPostReq.getNickname())
				.address(userSignUpPostReq.getAddress())
				.birth(userSignUpPostReq.getBirth())
				.phone(userSignUpPostReq.getPhone())
				.point(0L)
				.img(userSignUpPostReq.getImg())
				.createdAt(userSignUpPostReq.getCreatedAt())
				.auth(auth).build();

		userRepositorySupport.save(user);

		return;


	}

	@Override
	public User getUserByAuth(String email) {
		// 디비에 유저 정보 조회 (email을 통한 조회).
		// 디비에 유저 정보 조회 (email을 통한 조회).

		User user = User.builder().build();

		if(userRepositorySupport.findUserByAuth(email).isPresent()){
			user = userRepositorySupport.findUserByAuth(email).get();
		} else{
			user = userRepositorySupport.findUserByAuth(email).orElse(null);
		}
		return user;
	}

	@Override
	public User getUserByNickname(String nickname)  {
		// 닉네임으로 유저 정보 조회
		User user = new User();

		if(userRepositorySupport.findByNickname(nickname).isPresent()){
			user = userRepositorySupport.findByNickname(nickname).get();
		} else{
			user = userRepositorySupport.findByNickname(nickname).orElse(null);
		}
		return user;
	}
}
