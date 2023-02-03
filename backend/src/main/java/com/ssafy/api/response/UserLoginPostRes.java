package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.user.UserRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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
	LocalDate birth;
	String phone;
	Long point;
	String img;
	String description;
	UserRole userRole;

	List<Long> bookmarkList;

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
		res.setPoint(userLoginPostRes.getPoint());
		res.setImg(userLoginPostRes.getImg());
		res.setDescription(userLoginPostRes.getDescription());
		res.setUserRole(userLoginPostRes.getUserRole());
		res.setBookmarkList(userLoginPostRes.bookmarkList);
		return res;
	}
}
