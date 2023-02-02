import React from 'react';
import { atom } from 'recoil';
import { UserInfo } from '../types/UserType';

const PrivateInfoState = atom<UserInfo>({
  key: 'PrivateInfoData',
  default: {
    userId: 'ssafy1234@ssafy.ac.kr',
  },
});
export default PrivateInfoState;
