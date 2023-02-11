import useApi from '../apis/UserApi';

const FindPwViewModel = () => {
  const { doFindPw } = useApi();

  const findPw = async (name: string, email: string) => {
    const response = await doFindPw(name, email);

    return response.message;
  };

  return {
    findPw,
  };
};

export default FindPwViewModel;
