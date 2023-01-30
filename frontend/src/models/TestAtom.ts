import React from 'react';
import { atom } from 'recoil';

const testState = atom({
  key: 'testData',
  default: 1,
});

export default testState;
