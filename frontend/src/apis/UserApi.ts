import { Email } from '@mui/icons-material';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { Response } from '../types/BaseType';
import {
  SignUpRequest,
  SaltResponse,
  LoginRequest,
  LoginResponse,
} from '../types/UserType';

const UserApi = () => {
  const accesstoken = localStorage.getItem('accessToken');

  const doFindPw = async (name: string, email: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/check?name=${name}`,
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const doGetUserInfo = async (email: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  // salt를 가져오는 함수
  const doGetSalt = async (email: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/salt?email=${email}`,
      );
      // salt를 반환
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  // 로그인 함수
  const doLogin = async (loginRequestBody: LoginRequest) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/login`,
        loginRequestBody,
      );
      const { headers, data } = response;
      const authtoken = response.headers.authorization.substring(7);
      localStorage.setItem('accessToken', authtoken);

      // 로그인 헤더와 데이터를 반환
      return { headers, data };
    } catch (error: any) {
      // 로그인과 return 형식을 맞추기 위해 error.response를 return
      return error.response;
    }
  };

  // 회원가입 함수
  const doSignUp = async (signupRequestBody: SignUpRequest) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users`,
        signupRequestBody,
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  // 이메일 중복 확인 함수
  const doEmailDuplicationCheck = async (email: string) => {
    try {
      const response = await axios.get<number>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/duplicate/email/${email}`,
      );
      // 요청 결과를 리턴
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const doGetAccessToken = async (email: string, refreshtoken: string) => {
    try {
      const response = await axios.get<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/token?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${refreshtoken}`,
          },
        },
      );
      const { headers, data } = response;
      return { headers, data };
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdateProfileImage = async (email: string, url: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/img?img=${url}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdateNickName = async (email: string, nickname: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/nickname?nickname=${nickname}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdatePhone = async (email: string, phone: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/phone?phone=${phone}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data.statusCode;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdateAddress = async (email: string, address: string) => {
    try {
      const respnose = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/address?address=${address}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return respnose.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdateDescription = async (email: string, description: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/description?description=${description}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doUpdatePassword = async (email: string, hashedPassword: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/password`,
        {
          password: hashedPassword,
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const doWithdrawl = async (email: string) => {
    try {
      const response = await axios.delete<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const doLogout = async (email: string) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/logout?email=${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const getMyReviewsApi = async (
    email: string,
    limit: number,
    offset: number,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review/list/users/${email}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return {
    doSignUp,
    doEmailDuplicationCheck,
    doGetSalt,
    doLogin,
    doUpdateProfileImage,
    doGetAccessToken,
    doUpdateNickName,
    doUpdatePhone,
    doUpdateAddress,
    doUpdateDescription,
    doUpdatePassword,
    doWithdrawl,
    doLogout,
    doGetUserInfo,
    doFindPw,
    getMyReviewsApi,
  };
};

export default UserApi;
