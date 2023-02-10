import { atom } from 'recoil';

// const { persistAtom } = recoilPersist();

const AuthTokenState = atom({
  key: 'AuthTokenData',
  default: null,
});
export default AuthTokenState;
