import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import authToken from '../store/authToken';
import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/RecommandLessons';
import CreateLessons from '../components/CreateLessons';
import ApplyLessons from '../components/ApplyLessons';

const MainPage = () => {
  const authTokenState = useRecoilValue(authToken);

  return (
    <div className="page">
      <CustomCarousel />
      {authTokenState ? <CreateLessons /> : <p>no lessons</p>}
      {authTokenState ? <ApplyLessons /> : <p>no lessons</p>}
      <RecommandLessons />
    </div>
  );
};

export default MainPage;
