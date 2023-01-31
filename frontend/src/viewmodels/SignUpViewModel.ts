import useApi from '../apis/UserApi';

import { SignUpRequest } from '../types/UserType';

const SignUpViewModel = () => {
  const { doSignUp } = useApi();

  const emailDuplicationCheck = () => {
    console.log('test');
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
