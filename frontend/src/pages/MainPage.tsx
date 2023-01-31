import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import authToken from '../models/authToken';
import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/MainPage/RecommandLessons';
import MyCreatedLessons from '../components/MainPage/MyCreatedLessonsMainpage';
import ApplyLessons from '../components/ApplyLessons';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainPage = () => {
  const authTokenState = useRecoilValue(authToken);

  return (
    <div className="page">
      <Header />
      <CustomCarousel />
      <div className="create_apply_lessons">
        {authTokenState ? <MyCreatedLessons /> : <p>no lessons</p>}
        {authTokenState ? <ApplyLessons /> : <p>no lessons</p>}
      </div>
      <RecommandLessons />
      <Footer />
    </div>
  );
};

export default MainPage;
