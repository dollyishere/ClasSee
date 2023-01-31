import useApi from '../apis/UserApi';

import { SignUpRequest } from '../types/UserType';

const SignUpViewModel = () => {
  const { doSignUp, doEmailDuplicationCheck } = useApi();

  const emailDuplicationCheck = async (email: string) => {
    const res = await doEmailDuplicationCheck(email);

    return res;
  };

  const signup = (data: SignUpRequest) => {
    doSignUp(data);
  };

  return {
    emailDuplicationCheck,
    signup,
  };
};

export default SignUpViewModel;
