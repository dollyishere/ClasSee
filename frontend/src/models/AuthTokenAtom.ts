import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

// const { persistAtom } = recoilPersist({
//   key: 'AuthToken',
//   storage: localStorage,
// });

const AuthTokenState = atom({
  key: 'AuthTokenData',
  default: null,
  // effects_UNSTABLE: [persistAtom],
});
export default AuthTokenState;
