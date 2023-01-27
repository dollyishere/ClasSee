import React from 'react';

import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/RecommandLessons';

const MainPage = () => {
  return (
    <div className="page">
      <CustomCarousel />
      <RecommandLessons />
    </div>
  );
};

export default MainPage;
