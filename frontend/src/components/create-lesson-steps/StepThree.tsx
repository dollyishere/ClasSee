import React from 'react';

import { StepThreeProps } from '../../types/CreateLessonType';

const StepThree = ({ lessonDescription, setLessonDescription }: StepThreeProps) => {
  const handleInputLessonName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLessonDescription(e.target.value);
  };

  return (
    <div>
      <h2>Step 3. 강의 소개 입력</h2>
      <textarea
        cols={30}
        rows={10}
        placeholder="강의 소개를 입력해주세요."
        value={lessonDescription}
        onChange={handleInputLessonName}
      />
    </div>
  );
};

export default StepThree;
