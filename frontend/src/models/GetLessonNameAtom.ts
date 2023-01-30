import { atom } from 'recoil';

export const getLessonNameState = atom<string>({
  key: 'getLessonNameState',
  default: '',
});

export const getCategoryState = atom<string>({
  key: 'getCategoryState',
  default: '',
});
