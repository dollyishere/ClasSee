import React from 'react';

import CustomCarousel from '../components/CustomCarousel';
import LectureCard from '../components/LectureCard';
import Lizard from '../components/Lizard';

const MainPage = () => {
  return (
    <div>
      <CustomCarousel />
      <LectureCard />
      <Lizard />
    </div>
  );
};

export default MainPage;
