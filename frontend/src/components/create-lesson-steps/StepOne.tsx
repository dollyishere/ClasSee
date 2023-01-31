import React, { useRef, useState, useContext } from 'react';

import CategorySelectBox from '../CategorySelectBox';

interface OutletProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const StepOne = () => {
  const [getLessonName, setGetLessonName] = useState('');

  const handleLoginSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGetLessonName(e.target.value);
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <div>
        <CategorySelectBox />
      </div>
      <div>
        <input value={getLessonName} onChange={handleLoginSubmit} placeholder="강의명을 입력해주세요" />
      </div>
    </div>
  );
};
export default StepOne;
