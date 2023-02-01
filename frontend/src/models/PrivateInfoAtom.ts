import React from 'react';
import { atom } from 'recoil';
import { UserInfo } from '../types/UserInfo';

const PrivateInfoState = atom<UserInfo>({
  key: 'PrivateInfoData',
  default: {
    userId: null,
  },
});
export default PrivateInfoState;
