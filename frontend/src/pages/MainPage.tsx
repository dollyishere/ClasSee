import React from 'react';

import CustomCarousel from '../components/CustomCarousel';
import LessonCard from '../components/LessonCard';

const MainPage = () => {
  return (
    <div className="page">
      <CustomCarousel />
      <LessonCard />
    </div>
  );
};

export default MainPage;
