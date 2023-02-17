import React from 'react';

import CategorySelectBox from '../CategorySelectBox';

import { StepOneProps } from '../../types/LessonsType';

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
    <div className="step">
      <div className="step__title">Step 1. 강의명 입력</div>
      <div className="step__row step__right">
        {/* 카테고리 선택의 경우 하위 컴포넌트를 배정하고 그 안에 해당하는 props를 전달하는 것으로 작성함 */}
        <CategorySelectBox
          categorySelectState={categorySelectState}
          setCategorySelectState={setCategorySelectState}
        />
      </div>
      <div className="step__row step__center">
        {/* 강의명을 입력하는 input */}
        <input
          value={lessonNameState}
          onChange={handleInputLessonName}
          className="step__lesson-title"
          placeholder="강의명을 입력해주세요"
        />
      </div>
    </div>
  );
};
export default StepOne;
