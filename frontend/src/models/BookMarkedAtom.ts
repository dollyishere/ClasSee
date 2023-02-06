import React from 'react';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { BookMarkedResponse } from '../types/LessonsType';

const { persistAtom } = recoilPersist({
  key: 'BookMarkedList',
  storage: localStorage,
});

const BookMarkedState = atom<BookMarkedResponse>({
  key: 'BookMarkedData',
  default: { BookMarkedList: [] },
  effects_UNSTABLE: [persistAtom],
});
export default BookMarkedState;
