import { atom } from 'recoil';

// const { persistAtom } = recoilPersist();

const AuthTokenState = atom({
  key: 'AuthTokenData',
  default: null,
});
export default AuthTokenState;

// const AuthTokenState = recoilPersist(
//   atom({
//     key: 'authToken',
//     default: '',
//     // effects_UNSTABLE: [persistAtom],
//   }),
// );

// export default AuthTokenState;
