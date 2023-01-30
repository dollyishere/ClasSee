import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import CategorySelectBox from '../CategorySelectBox';

const StepOne = () => {
  const [getLessonName, setGetLessonName] = useState('');

  const handleLoginSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGetLessonName(e.target.value);
    console.log(getLessonName);
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <div>
        <CategorySelectBox />
      </div>
      <div>
        <input value={getLessonName} onChange={handleLoginSubmit} placeholder="강의명을 입력해주세요" />
        <CardActions>
          <Link to="/create_lesson/2">
            <Button type="submit" variant="contained">
              다음 단계
            </Button>
          </Link>
        </CardActions>
      </div>
    </div>
  );
};
export default StepOne;
