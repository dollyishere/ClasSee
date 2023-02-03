import { useRecoilValue } from 'recoil';

import authTokenState from '../models/AuthTokenAtom';

const ProfileViewModel = () => {
  const authToken = useRecoilValue(authTokenState);
  return {};
};

export default ProfileViewModel;
