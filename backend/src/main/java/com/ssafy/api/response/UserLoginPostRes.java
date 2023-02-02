package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
	String email;
	String name;
	String nickname;
	String address;
	String birth;
	String phone;
	Long point;
	String img;
	String description;
	UserRole userRole;

	public static UserLoginPostRes of(Integer statusCode, String message, UserLoginPostRes userLoginPostRes) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setEmail(userLoginPostRes.getEmail());
		res.setName(userLoginPostRes.getName());
		res.setNickname(userLoginPostRes.getNickname());
		res.setAddress(userLoginPostRes.getAddress());
		res.setBirth(userLoginPostRes.getBirth());
		res.setPhone(userLoginPostRes.getPhone());
		res.setPhone(userLoginPostRes.getPhone());
		res.setImg(userLoginPostRes.getImg());
		res.setDescription(userLoginPostRes.getDescription());
		res.setUserRole(userLoginPostRes.getUserRole());
		return res;
	}
}
