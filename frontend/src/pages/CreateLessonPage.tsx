import React, { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

import '../styles/pages/_create-lesson-page.scss';

import Card from '@mui/material/Card';

const CreateLessonPage = () => {
  const [progress, setProgress] = React.useState(10);
  return (
    <div className="container">
      {/* 페이지 제목 지정 */}
      <h1>강의 간편 개설하기</h1>
      {/* 카드로 form이 들어갈 영역 지정 */}
      <Card sx={{ minWidth: 275 }}>
        {/* 각 자식 component가 렌더링 되는 위치를 Outlet으로 지정 */}
        <Outlet />
      </Card>
    </div>
  );
};
export default CreateLessonPage;
