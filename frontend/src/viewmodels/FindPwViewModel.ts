import useApi from '../apis/UserApi';

import { createHashedPassword } from '../utils/Encrypt';

const FindPwViewModel = () => {
  const { doFindPw, doUpdatePassword, doGetSalt } = useApi();

  const findPw = async (name: string, email: string) => {
    const response = await doFindPw(name, email);

    return response.message;
  };

  const updatePw = async (email: string, password: string) => {
    const salt = await doGetSalt(email);
    if (salt !== null) {
      const hashedPassword = createHashedPassword(password, salt);
      const response = await doUpdatePassword(email, hashedPassword);
      console.log(response);
    }
  };

  return {
    findPw,
    updatePw,
  };
};

export default FindPwViewModel;
