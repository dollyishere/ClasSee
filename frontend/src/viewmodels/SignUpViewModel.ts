import useApi from '../apis/UserApi';

import { SignUpRequest } from '../types/UserType';

const SignUpViewModel = () => {
  const { doSignUp, doEmailDuplicationCheck } = useApi();

  const emailDuplicationCheck = async (email: string) => {
    const res = await doEmailDuplicationCheck(email);

    return res;
  };

  const signup = async (data: SignUpRequest) => {
    const res = await doSignUp(data);
    return res;
  };

  return {
    emailDuplicationCheck,
    signup,
  };
};

export default SignUpViewModel;
