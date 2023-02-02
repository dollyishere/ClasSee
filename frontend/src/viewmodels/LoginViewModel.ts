import { useRecoilState } from 'recoil';

import useApi from '../apis/UserApi';

import { createHashedPassword } from '../utils/Encrypt';

const LoginViewModel = () => {
  const { doGetSalt, doLogin } = useApi();

  const login = async (email: string, password: string) => {
    const salt = await doGetSalt(email);
    if (salt !== null) {
      const hashedPassword = createHashedPassword(password, salt);
      const res = await doLogin({
        email,
        password: hashedPassword,
      });

      console.log(res);
    }

    return 'false';
  };
  return {
    login,
  };
};

export default LoginViewModel;
