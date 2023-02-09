// 원래 여기서 하면 안됨. api 호출을 위한 axios 라이브러리
import axios from 'axios';

import { Session } from 'openvidu-browser';

import { useRecoilState, useRecoilValue } from 'recoil';
import privateInfoState from '../models/PrivateInfoAtom';
import useApi from '../apis/UserApi';
import { decryptToken, encryptToken } from '../utils/Encrypt';
import AuthTokenState from '../models/AuthTokenAtom';

const LessonViewModel = () => {
  const [authToken, setAuthToken] = useRecoilState(AuthTokenState);
  const { doGetAccessToken } = useApi();
  const createToken = async (sessionId: string, accessToken: string | null) => {
    console.log(accessToken);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/api/v1/openvidu/sessions/${sessionId}/connections`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  };

  const createSession = async (email: string, sessionId: string) => {
    try {
      const hashedRefreshToken = localStorage.getItem('refreshToken');
      if (hashedRefreshToken !== null) {
        const refreshToken = decryptToken(hashedRefreshToken, email);
        const tokenResponse = await doGetAccessToken(email, refreshToken);
        const newRefreshToken = tokenResponse?.headers['refresh-token'];
        const newAccessToken =
          tokenResponse?.headers.authorization.substring(7);
        console.log(newAccessToken, newRefreshToken);
        if (newAccessToken !== undefined && newRefreshToken !== undefined) {
          localStorage.setItem(
            'refreshToken',
            encryptToken(newRefreshToken, email),
          );
          setAuthToken(newAccessToken);
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URI}/api/v1/openvidu/sessions`,
            { customSessionId: sessionId },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${newAccessToken}`,
              },
            },
          );
          return { testId: response.data, testToken: newAccessToken };
        }
      }
    } catch (error: any) {
      console.log(error);
    }
    return { testId: null, testToken: null };
  };
  // const getToken = async (
  //   mySessionId: string,
  //   email: string,
  //   accessToken: string | null,
  // ) => {
  //   const sessionId = await createSession(email, mySessionId);
  //   const token = await createToken(sessionId, accessToken);
  //   return token;
  // };

  const chat = (session: Session, message: string) => {
    session
      .signal({
        data: message,
        to: [],
        type: 'chat',
      })
      .then(() => {
        console.log('Message successfully sent');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return {
    createSession,
    createToken,
    chat,
  };
};

export default LessonViewModel;
