import React from 'react';

import CategorySelectBox from '../CategorySelectBox';

import { StepOneProps } from '../../types/CreateLessonType';

const StepOne = ({
  lessonNameState,
  setLessonNameState,
  categorySelectState,
  setCategorySelectState,
}: StepOneProps) => {
  // 만약 해당 input 태그 내부 값이 변경될 시, onChange와 setLessonNameState을 이용해 값을 변경함
  const handleInputLessonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonNameState(e.target.value);
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <div>
        {/* 카테고리 선택의 경우 하위 컴포넌트를 배정하고 그 안에 해당하는 props를 전달하는 것으로 작성함 */}
        <CategorySelectBox categorySelectState={categorySelectState} setCategorySelectState={setCategorySelectState} />
      </div>
      <div>
        {/* 강의명을 입력하는 input */}
        <input value={lessonNameState} onChange={handleInputLessonName} placeholder="강의명을 입력해주세요" />
      </div>
    </div>
  );
};
export default StepOne;
