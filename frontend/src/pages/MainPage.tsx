import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import privateInfoState from '../models/PrivateInfoAtom';
import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/MainPage/RecommandLessons';
import MyCreatedLessonsMainpage from '../components/MainPage/MyCreatedLessonsMainpage';
import MyAppliedLessonsMainpage from '../components/MainPage/MyAppliedLessonsMainpage';
import MyAppliedLessonsMainpageTest from '../components/MainPage/MyAppliedLessonsMainpageTest';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainPage = () => {
  const privateInfo = useRecoilValue(privateInfoState);

  return (
    <div className="page">
      <Header />
      <CustomCarousel />
      <div className="create_apply_lessons">
        {privateInfo !== null ? (
          <MyCreatedLessonsMainpage />
        ) : (
          <p>no lessons</p>
        )}
        {privateInfo !== null ? (
          <MyAppliedLessonsMainpageTest />
        ) : (
          <p>no lessons</p>
        )}
      </div>
      <RecommandLessons />
      <Footer />
    </div>
  );
};

export default MainPage;
