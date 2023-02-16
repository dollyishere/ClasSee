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
    const response = await doLogout(email);

    setPrivateInfo(null);
    sessionStorage.clear();
    localStorage.setItem('accessToken', '');
    return response;
  };

  const login = async (email: string, password: string) => {
    const saltResponse = await doGetSalt(email);
    if (saltResponse.statusCode === 200) {
      const hashedPassword = createHashedPassword(password, saltResponse.salt);
      const loginResponse = await doLogin({
        email,
        password: hashedPassword,
      });
      if (loginResponse.statusCode === 401) {
        return loginResponse.statusCode;
      }
      if (loginResponse.data?.statusCode === 200) {
        setPrivateInfo({
          email: loginResponse.data.email,
          name: loginResponse.data.name,
          nickname: loginResponse.data.nickname,
          address: loginResponse.data.address,
          birth: loginResponse.data.birth,
          img: loginResponse.data.img,
          description: loginResponse.data.description,
          phone: loginResponse.data.phone,
          userRole: loginResponse.data.userRole,
          point: loginResponse.data.point,
        });
        const accessToken = loginResponse.headers.authorization.substr(7);
        const refreshToken = loginResponse.headers['refresh-token'];
        setAuthToken(accessToken);
        const encryptedToken = encryptToken(
          refreshToken,
          loginResponse.data.email,
        );
        localStorage.setItem('refreshToken', encryptedToken);
        sessionStorage.setItem('isLogin', 'true');
        return {
          statusCode: 200,
        };
      }
    }
    // get salt api 응답 코드에 따라 다르게 반환할것
    return saltResponse;
  };
  return {
    login,
    logout,
  };
};

export default LoginViewModel;
