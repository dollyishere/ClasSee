import React from 'react';
import { atom } from 'recoil';
import { UserInfo } from '../types/UserType';

const PrivateInfoState = atom<UserInfo | null>({
  key: 'PrivateInfoData',
  default: null,
});
export default PrivateInfoState;
