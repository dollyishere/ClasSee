import React from 'react';
import { atom } from 'recoil';
import { UserInfo } from '../types/UserType';

const PrivateInfoState = atom<UserInfo>({
  key: 'PrivateInfoData',
  default: {
    email: null,
  },
});
export default PrivateInfoState;
