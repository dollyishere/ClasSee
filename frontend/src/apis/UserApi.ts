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
import authTokenState from '../models/AuthTokenAtom';

const UserApi = () => {
  const authToken = useRecoilValue(authTokenState);

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
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/token?email=${email}`,
        {
          headers: {
            refreshToken: refreshtoken,
          },
        },
      );
      return response.headers.accesstoken;
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

  const doUpdatePhone = async (email: string, phone: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/phone?phone=${phone}`,
      );
      return response.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doUpdateAddress = async (email: string, address: string) => {
    try {
      const respnose = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/address?address=${address}`,
      );
      return respnose.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doUpdateDescription = async (email: string, description: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/description?description=${description}`,
      );
      return response.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doUpdatePassword = async (email: string, hashedPassword: string) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/users/${email}/password`,
        {
          password: hashedPassword,
        },
      );
      return response.data.statusCode;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doLogout = async (email: string) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/logout?email=${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      return response.data.statusCode;
    } catch (error) {
      console.error(error);
    }
    return 403;
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
    doLogout,
  };
};

export default UserApi;
