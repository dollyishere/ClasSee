import axios from 'axios';

import { SignUpRequest, SignUpResponse } from '../types/UserType';

const UserApi = () => {
  // 회원가입 함수
  const doSignUp = async (signupRequestBody: SignUpRequest) => {
    try {
      const response = await axios.post<SignUpResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users`,
        signupRequestBody,
      );

      return response.data.message;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doEmailDuplicationCheck = async (email: string) => {
    try {
      const response = await axios.get<number>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/duplicate/email/${email}`,
      );
      // 요청 결과를 리턴
      return response.status;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  return {
    doSignUp,
    doEmailDuplicationCheck,
  };
};

export default UserApi;
