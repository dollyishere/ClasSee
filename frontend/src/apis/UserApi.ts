import axios from 'axios';

import { Response } from '../types/BaseType';
import { BookMarkedResponse } from '../types/LessonsType';
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
  // const doGetAccessToken = async () => {
  //   try {
  //     const response = await axios.get<Response>(
  //       `${process.env.REACT_APP_SERVER_URI}/api/v1/users~`,
  //     );
  const doGetAccessToken = async (email: string, refreshtoken: string) => {
    try {
      const response = await axios.get<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/accesstoken/${email}/${refreshtoken}`,
      );
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  // 로그인 떄 user의 북마크 정보를 받아오기 때문에 userapi에 작성
  const getBookMarked = async (email: string) => {
    try {
      const response = await axios.get<BookMarkedResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/bookmarks/${email}`,
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  return {
    doSignUp,
    doEmailDuplicationCheck,
    doGetSalt,
    doLogin,
    doGetAccessToken,
    getBookMarked,
  };
};

export default UserApi;
