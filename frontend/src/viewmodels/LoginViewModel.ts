import { useRecoilState } from 'recoil';

import useApi from '../apis/UserApi';
import privateInfoState from '../models/PrivateInfoAtom';
import authTokenState from '../models/AuthTokenAtom';
import BookMarkedState from '../models/BookMarkedAtom';

import {
  createHashedPassword,
  encryptToken,
  decryptToken,
} from '../utils/Encrypt';

// Login View와 Model을 연결하는 ViewModel
const LoginViewModel = () => {
  const [privateInfo, setPrivateInfo] = useRecoilState(privateInfoState);
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [bookMarked, setbookMarked] = useRecoilState(BookMarkedState);
  const { doGetSalt, doLogin, getBookMarked } = useApi();

  const login = async (email: string, password: string) => {
    // 로그인 시 회원의 북마크 강의 리스트를 받아온다
    const bookmark = await getBookMarked(email);
    if (bookmark) {
      console.log('북마크', bookmark);
      setbookMarked(bookmark);
    }
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
        setAuthToken(res.headers.authtoken);
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
  };
};

export default LoginViewModel;
