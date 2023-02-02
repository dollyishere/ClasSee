import { atom } from 'recoil';

const AuthTokenState = atom({
  key: 'authToken',
  default: '',
});

export default AuthTokenState;
