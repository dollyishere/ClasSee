import React from 'react';
import { atom } from 'recoil';

const MyCreatedLessonsState = atom({
  key: 'MyCreatedLessonsData',
  default: [],
});

export default MyCreatedLessonsState;
