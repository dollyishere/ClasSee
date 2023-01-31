import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/_create-lesson-page.scss';

import { Button, Card, CardActions } from '@mui/material';

import StepOne from '../components/create-lesson-steps/StepOne';
import StepTwo from '../components/create-lesson-steps/StepTwo';
import StepThree from '../components/create-lesson-steps/StepThree';
import StepFour from '../components/create-lesson-steps/StepFour';
import StepFive from '../components/create-lesson-steps/StepFive';
import StepSix from '../components/create-lesson-steps/StepSix';

const CreateLessonPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [data, setData] = useState<string>('');
  return (
    <div className="container">
      {/* 페이지 제목 지정 */}
      <h1>강의 간편 개설하기</h1>
      {/* 카드로 form이 들어갈 영역 지정 */}
      {/* selectedComponent 값이 변환될 시, 해당하는 컴포넌트를 리렌더링함 */}
      <Card sx={{ minWidth: 275 }}>
        {selectedComponent === 1 && <StepOne />}
        {selectedComponent === 2 && <StepTwo />}
        {selectedComponent === 3 && <StepThree />}
        {selectedComponent === 4 && <StepFour />}
        {selectedComponent === 5 && <StepFive />}
        {selectedComponent === 6 && <StepSix />}
        <CardActions>
          {selectedComponent === 1 ? null : (
            <Button type="button" variant="contained" onClick={() => setSelectedComponent(selectedComponent - 1)}>
              이전 단계
            </Button>
          )}
          {selectedComponent === 6 ? (
            <Button type="submit" variant="contained">
              제출
            </Button>
          ) : (
            <Button type="button" variant="contained" onClick={() => setSelectedComponent(selectedComponent + 1)}>
              다음 단계
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default CreateLessonPage;
