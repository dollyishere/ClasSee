import { decryptToken, encryptToken } from './Encrypt';
import { UserInfo } from '../types/UserType';

// 로그인 인증 필요한
export const AccessToken = async (
  userInfo: UserInfo,
  doGetAccessToken: (
    email: string,
    refreshtoken: string,
  ) => Promise<{ headers: any; data: any } | null>,
) => {
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
      if (newAccessToken !== undefined && newRefreshToken !== undefined) {
        localStorage.setItem(
          'refreshToken',
          encryptToken(newRefreshToken, userInfo.email),
        );
        localStorage.setItem('accessToken', newAccessToken);
      }
      return newAccessToken;
    }
  }
  return null;
};
export default AccessToken;
