import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import CategorySelectBox from '../CategorySelectBox';
import { getLessonNameState, getCategoryState } from '../../models/GetLessonNameAtom';

const StepOne = () => {
  const [getLessonName, setGetLessonName] = useRecoilState(getLessonNameState);

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
