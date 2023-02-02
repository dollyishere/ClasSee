package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ApiModel("UserSaltRes")
public class UserSaltRes extends BaseResponseBody {
    String salt;

    public static UserSaltRes of(Integer statusCode, String message, String salt) {
        UserSaltRes res = new UserSaltRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSalt(salt);
        return res;
    }
}
