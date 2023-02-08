import { useRecoilState } from 'recoil';

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
  };

  const login = async (email: string, password: string) => {
    const salt = await doGetSalt(email);
    if (salt !== null) {
      const hashedPassword = createHashedPassword(password, salt);
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
        // console.log(res.headers.accesstoken);
        console.log('리프레시', res.headers.refreshtoken);
        setAuthToken(res.headers.accesstoken);
        const encryptedToken = encryptToken(
          res.headers.refreshtoken,
          res.data.email,
        );
        localStorage.setItem('refreshToken', encryptedToken);
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
