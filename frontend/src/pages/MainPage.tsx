import React from 'react';

import CustomCarousel from '../components/CustomCarousel';
import LectureCard from '../components/LectureCard';

const MainPage = () => {
  return (
    <div className="page">
      <CustomCarousel />
      <LectureCard />
    </div>
  );
};

export default MainPage;
