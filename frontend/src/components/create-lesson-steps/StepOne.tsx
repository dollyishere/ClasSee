import React, { useRef, useState, useContext } from 'react';

import CategorySelectBox from '../CategorySelectBox';

interface StepOneProps {
  lessonName: string;
  setLessonName: React.Dispatch<React.SetStateAction<string>>;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
}

const StepOne = ({ lessonName, setLessonName, categorySelect, setCategorySelect }: StepOneProps) => {
  const handleInputLessonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonName(e.target.value);
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <div>
        <CategorySelectBox categorySelect={categorySelect} setCategorySelect={setCategorySelect} />
      </div>
      <div>
        <input value={lessonName} onChange={handleInputLessonName} placeholder="강의명을 입력해주세요" />
      </div>
    </div>
  );
};
export default StepOne;
