// 원래 여기서 하면 안됨. api 호출을 위한 axios 라이브러리
import axios from 'axios';

import { Session } from 'openvidu-browser';

import { useRecoilState, useRecoilValue } from 'recoil';
import privateInfoState from '../models/PrivateInfoAtom';
import useApi from '../apis/VideoCallApi';
import { decryptToken, encryptToken } from '../utils/Encrypt';
import AuthTokenState from '../models/AuthTokenAtom';

const VideoCallViewModel = () => {
  const { doCreateSession, doCreateToken } = useApi();

  const createSession = async (email: string, sessionId: string) => {
    const response = await doCreateSession(email, sessionId);
    return response;
  };

  const createToken = async (sessionId: string) => {
    const response = await doCreateToken(sessionId);
    return response;
  };

  const chat = (session: Session, message: string) => {
    session
      .signal({
        data: JSON.stringify({
          message,
          time: new Date(),
        }),
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

export default VideoCallViewModel;
