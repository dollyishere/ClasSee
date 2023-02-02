import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import authTokenState from '../models/AuthTokenAtom';
import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/MainPage/RecommandLessons';
import MyCreatedLessonsMainpage from '../components/MainPage/MyCreatedLessonsMainpage';
import ApplyLessons from '../components/ApplyLessons';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainPage = () => {
  const authToken = useRecoilValue(authTokenState);

  return (
    <div className="page">
      <Header />
      <CustomCarousel />
      <div className="create_apply_lessons">
        {authToken ? <MyCreatedLessonsMainpage /> : <p>no lessons</p>}
        {authToken ? <ApplyLessons /> : <p>no lessons</p>}
      </div>
      <RecommandLessons />
      <Footer />
    </div>
  );
};

export default MainPage;
