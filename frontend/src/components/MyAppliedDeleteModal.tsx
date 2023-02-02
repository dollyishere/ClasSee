import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { LessonsResponse, Lesson } from '../types/LessonsType';
import useViewModel from '../viewmodels/MainPageViewModel';
import PrivateInfoState from '../models/PrivateInfoAtom';

const MyAppliedDeleteModal = (lessonId: number) => {
  // 내가 신청한 강의 delete api를 위한 viewmodel
  const { deleteMyAppliedLessonsMainpage } = useViewModel();
  // userId 가져오기
  const userInfo = useRecoilValue(PrivateInfoState);
  // 강의 취소 모달에서 취소 클릭 시 발동되는 delete api 호출 함수
  const cancelApply = () => {
    deleteMyAppliedLessonsMainpage(userInfo.userId, lessonId).then(
      (res: string) => {
        console.log(res);
      },
    );
  };
  return (
    <div>
      <h3>정말 취소하시겠습니까?</h3>
      <button type="button" onClick={cancelApply}>
        신청 취소
      </button>
    </div>
  );
};

export default MyAppliedDeleteModal;
