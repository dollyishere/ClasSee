package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoGetResponse")
public class UserInfoGetRes extends BaseResponseBody {

    String name;
    String nickname;
    String address;
    String birth;
    String phone;
    String point;
    String img;
    String description;

    public UserInfoGetRes(User user){
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.address = user.getAddress();
        this.birth = user.getBirth();
        this.phone = user.getPhone();
        this.point = user.getPhone();
        this.img = user.getImg();
        this.description = user.getDescription();
    }

}
