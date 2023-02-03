import React, { useEffect, useRef } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import useViewModel from '../../viewmodels/MainPageViewModel';
import PrivateInfoState from '../../models/PrivateInfoAtom';

interface Props {
  lessonId: number;
  setModalOpen: (value: boolean) => void;
}

const MyAppliedCancelModal = ({ lessonId, setModalOpen }: Props) => {
  // 내가 신청한 강의 delete api를 위한 viewmodel
  const { deleteMyAppliedLessonsMainpage } = useViewModel();
  // userId 가져오기
  const userInfo = useRecoilValue(PrivateInfoState);
  // 강의 취소 모달에서 취소 클릭 시 발동되는 delete api 호출 함수
  const cancelApply = () => {
    setModalOpen(false);
    deleteMyAppliedLessonsMainpage(userInfo.userId, lessonId).then(
      (res: string) => {
        console.log(res);
      },
    );
  };
  const modalRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // 이벤트 핸들러 함수
  //   const handler = () => {
  //     // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setModalOpen(false);
  //       console.log(event);
  //     }
  //   };

  //   // 이벤트 핸들러 등록
  //   document.addEventListener('mousedown', handler);
  //   // document.addEventListener('touchstart', handler); // 모바일 대응

  //   return () => {
  //     // 이벤트 핸들러 해제
  //     document.removeEventListener('mousedown', handler);
  //     // document.removeEventListener('touchstart', handler); // 모바일 대응
  //   };
  // });
  return (
    <div ref={modalRef} className="applylessons__cancelmodal">
      <h3>정말 취소하시겠습니까?</h3>
      <button
        type="button"
        onClick={cancelApply}
        className="applylessons__cancelmodal--button"
      >
        신청 취소
      </button>
    </div>
  );
};

export default MyAppliedCancelModal;
