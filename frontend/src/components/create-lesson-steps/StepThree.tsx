import React from 'react';

import { StepThreeProps } from '../../types/CreateLessonType';

const StepThree = ({ lessonDescState, setLessonDescState }: StepThreeProps) => {
  // 해당하는 textarea 값이 변경될 시, onChange, setLessonDescState을 이용해 lessonDescState의 값을 변경함
  const handleInputLessonName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLessonDescState(e.target.value);
  };

  return (
    <div>
      <h2>Step 3. 강의 소개 입력</h2>
      {/* 강의 소개를 입력하는 textarea */}
      <textarea
        cols={30}
        rows={10}
        placeholder="강의 소개를 입력해주세요."
        value={lessonDescState}
        onChange={handleInputLessonName}
      />
    </div>
  );
};

export default StepThree;
