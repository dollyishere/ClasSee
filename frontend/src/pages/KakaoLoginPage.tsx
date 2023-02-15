import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import PrivateInfoState from '../models/PrivateInfoAtom';
import AuthTokenState from '../models/AuthTokenAtom';

import { encryptToken } from '../utils/Encrypt';

const KakaoLoginPage = () => {
  const [useInfo, setUserInfo] = useRecoilState(PrivateInfoState);
  const [authToken, setAuthToken] = useRecoilState(AuthTokenState);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const code = location.search.split('=')[1];
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/kakao?code=${code}`,
        )
        .then((response) => {
          const accessToken = response.headers.authorization.substr(7);
          localStorage.setItem('accessToken', accessToken);
          setAuthToken(accessToken);
          setUserInfo(response.data);
          const refreshToken = response.headers['refresh-token'];
          const encryptedToken = encryptToken(
            refreshToken,
            response.data.email,
          );
          localStorage.setItem('refreshToken', encryptedToken);
          sessionStorage.setItem('isLogin', 'true');
        });
      navigate('/');
    };
    getData();
  }, []);
  return <>로그인 처리 중...</>;
};

export default KakaoLoginPage;
