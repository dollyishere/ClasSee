import axios from 'axios';

import { SignUpRequest, SignUpResponse } from '../types/UserType';

const UserApi = () => {
  // 회원가입 함수
  const doSignUp = (signupRequestBody: SignUpRequest) => {
    axios
      .post<SignUpResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users`,
        signupRequestBody,
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return {
    doSignUp,
  };
};

export default UserApi;
