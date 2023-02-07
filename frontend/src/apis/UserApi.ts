import { Email } from '@mui/icons-material';
import axios from 'axios';

import { Response } from '../types/BaseType';
import {
  SignUpRequest,
  SaltResponse,
  LoginRequest,
  LoginResponse,
} from '../types/UserType';

const UserApi = () => {
  // salt를 가져오는 함수
  const doGetSalt = async (email: string) => {
    try {
      const response = await axios.get<SaltResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/salt?email=${email}`,
      );
      // salt를 반환
      return response.data.salt;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  // 로그인 함수
  const doLogin = async (loginRequestBody: LoginRequest) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/login`,
        loginRequestBody,
      );
      const { headers, data } = response;
      // 로그인 헤더와 데이터를 반환
      return { headers, data };
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  // 회원가입 함수
  const doSignUp = async (signupRequestBody: SignUpRequest) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users`,
        signupRequestBody,
      );

      return response.data.message;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  // 이메일 중복 확인 함수
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

  const doGetAccessToken = async () => {
    try {
      const response = await axios.get<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users~`,
      );
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doUpdateProfileImage = async (email: string, url: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/img?img=${url}`,
      );

      return response.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doUpdateNickName = async (email: string, nickname: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/nickname?nickname=${nickname}`,
      );
      return response.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  return {
    doSignUp,
    doEmailDuplicationCheck,
    doGetSalt,
    doLogin,
    doUpdateProfileImage,
    doGetAccessToken,
    doUpdateNickName,
  };
};

export default UserApi;
