import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import CategorySelectBox from '../CategorySelectBox';

const StepOne = () => {
  const lecturenameRef = useRef(null);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    console.log(lecturenameRef?.current);
    if (lecturenameRef?.current) {
      const lecturename = lecturenameRef?.current as HTMLInputElement;
      console.log(lecturename.value);
    }
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <div>
        <CategorySelectBox />
      </div>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" ref={lecturenameRef} placeholder="강의명을 입력해주세요" />
        <CardActions>
          <Link to="/create_lesson/2">
            <Button type="submit" variant="contained">
              다음 단계
            </Button>
          </Link>
        </CardActions>
      </form>
    </div>
  );
};
export default StepOne;
