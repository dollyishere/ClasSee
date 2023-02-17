import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ListResult } from 'firebase/storage';
import privateInfoState from '../models/PrivateInfoAtom';
import CustomCarousel from '../components/CustomCarousel';
import RecommandLessons from '../components/MainPage/RecommandLessons';
import MyCreatedLessonsMainpage from '../components/MainPage/MyCreatedLessonsMainpage';
import MyAppliedLessonsMainpage from '../components/MainPage/MyAppliedLessonsMainpage';
import Footer from '../components/Footer';
import Header from '../components/Header';

import useViewModel from '../viewmodels/AdViewModel';

const MainPage = () => {
  const { getAdsRef } = useViewModel();
  const [ads, setAds] = useState<ListResult>();

  useEffect(() => {
    const getData = async () => {
      const response = await getAdsRef();
      setAds(response);
    };
    getData();
  }, []);
  const privateInfo = useRecoilValue(privateInfoState);
  return (
    <div className="page">
      <Header />
      <CustomCarousel ads={ads} />
      <div className="create_apply_lessons">
        {privateInfo !== null ? <MyCreatedLessonsMainpage /> : null}
        {privateInfo !== null ? <MyAppliedLessonsMainpage /> : null}
      </div>
      <RecommandLessons />
      <Footer />
    </div>
  );
};

export default MainPage;
