import React from 'react';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo } from '../types/UserType';

const { persistAtom } = recoilPersist({
  key: 'PrivateInfo',
  storage: localStorage,
});

const PrivateInfoState = atom<UserInfo | null>({
  key: 'PrivateInfoData',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export default PrivateInfoState;
