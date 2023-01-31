import { atom } from 'recoil';

const authToken = atom({
  key: 'authToken',
  default: 'asdf',
});

export default authToken;
