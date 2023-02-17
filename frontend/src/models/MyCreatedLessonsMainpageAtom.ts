import React from 'react';
import { atom } from 'recoil';

const MyCreatedLessonsMainpageState = atom({
  key: 'MyCreatedLessonsMainpageData',
  default: [],
});

export default MyCreatedLessonsMainpageState;
