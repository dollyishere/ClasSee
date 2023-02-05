import React from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBox from '../components/LessonsPage/SearchBox';

const LessonsPage = () => {
  const sidebarItems = [
    { name: '전체 강의', path: '/lessons' },
    { name: '공예', path: '/lessons/craft' },
    { name: '드로잉', path: '/lessons/drawing' },
    { name: '음악', path: '/lessons/music' },
    { name: '운동', path: '/lessons/exercise' },
    { name: '요리', path: '/lessons/cooking' },
    { name: '뷰티', path: '/lessons/beauty' },
    { name: '기타', path: '/lessons/etc' },
  ];
  return (
    <div className="lessons-page">
      <Header />
      <div className="lessons-page__contents">
        <Sidebar items={sidebarItems} />
        <div className="lessons-page__sub-page">
          <SearchBox />
          서브페이지
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
