import { useRecoilState } from 'recoil';

import { AxiosError } from 'axios';
import useApi from '../apis/UserApi';
import privateInfoState from '../models/PrivateInfoAtom';
import authTokenState from '../models/AuthTokenAtom';
import {
  createHashedPassword,
  encryptToken,
  decryptToken,
} from '../utils/Encrypt';

// Login View와 Model을 연결하는 ViewModel
const LoginViewModel = () => {
  const [privateInfo, setPrivateInfo] = useRecoilState(privateInfoState);
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const { doGetSalt, doLogin, doLogout, doGetAccessToken } = useApi();

  const logout = async (email: string) => {
    await doLogout(email);

    setPrivateInfo(null);
    sessionStorage.clear();
    localStorage.setItem('accessToken', '');
  };

  const login = async (email: string, password: string) => {
    const saltResponse = await doGetSalt(email);
    if (saltResponse.satusCode === 200) {
      const hashedPassword = createHashedPassword(password, saltResponse.salt);
      const res = await doLogin({
        email,
        password: hashedPassword,
      });
      if (res?.data.message === 'SUCCESS') {
        setPrivateInfo({
          email: res.data.email,
          name: res.data.name,
          nickname: res.data.nickname,
          address: res.data.address,
          birth: res.data.birth,
          img: res.data.img,
          description: res.data.description,
          phone: res.data.phone,
          userRole: res.data.userRole,
          point: res.data.point,
        });
        const accessToken = res.headers.authorization.substr(7);
        const refreshToken = res.headers['refresh-token'];
        setAuthToken(accessToken);
        const encryptedToken = encryptToken(refreshToken, res.data.email);
        localStorage.setItem('refreshToken', encryptedToken);
        sessionStorage.setItem('isLogin', 'true');
        return {
          statusCode: 200,
        };
      }
    }

    // get salt api 응답 코드에 따라 다르게 반환할것
    return {
      statusCode: 400,
    };
  };
  return {
    login,
    logout,
  };
};

export default LoginViewModel;
