import useApi from '../apis/UserApi';

import { createHashedPassword } from '../utils/Encrypt';

const FindPwViewModel = () => {
  const { doFindPw, doUpdatePassword, doGetSalt } = useApi();

  const findPw = async (name: string, email: string) => {
    const response = await doFindPw(name, email);

    return response;
  };

  const updatePw = async (email: string, password: string) => {
    const saltResponse = await doGetSalt(email);
    if (saltResponse.statusCode === 200) {
      const hashedPassword = createHashedPassword(password, saltResponse.salt);
      const response = await doUpdatePassword(email, hashedPassword);
      return response;
    }
    return saltResponse;
  };

  return {
    findPw,
    updatePw,
  };
};

export default FindPwViewModel;
