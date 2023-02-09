import { useRecoilValue, useRecoilState } from 'recoil';
import PrivateInfoState from '../models/PrivateInfoAtom';
import authTokenState from '../models/AuthTokenAtom';
import { decryptToken, encryptToken } from './Encrypt';
import useUserApi from '../apis/UserApi';

export const AccessToken = async () => {
  const [authtoken, setAuthToken] = useRecoilState(authTokenState);
  const userInfo = useRecoilValue(PrivateInfoState);
  const { doGetAccessToken } = useUserApi();
  if (userInfo) {
    const hashedRefreshToken = localStorage.getItem('refreshToken');
    if (hashedRefreshToken && userInfo.email) {
      const refreshToken = decryptToken(hashedRefreshToken, userInfo.email);
      const getAccessTokenResponse = await doGetAccessToken(
        userInfo.email,
        refreshToken,
      );
      const newRefreshToken = getAccessTokenResponse?.headers['refresh-token'];
      const newAccessToken =
        getAccessTokenResponse?.headers.authorization.substring(7);
      console.log(newRefreshToken);
      console.log(newAccessToken);
      if (newAccessToken !== undefined && newRefreshToken !== undefined) {
        localStorage.setItem(
          'refreshToken',
          encryptToken(newRefreshToken, userInfo.email),
        );
        setAuthToken(newAccessToken);
      }
      return newAccessToken;
    }
  }
  return null;
};
export default AccessToken;
