import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import TestPage from './TestPage';

import Header from '../components/Header';
import Sidebar from '../components/mypage/Sidebar';

const MyPage = () => {
  return (
    <div className="my-page page">
      <Header />
      <div className="my-page__contents">
        <Sidebar />
        <Routes>
          <Route path="" element={<ProfilePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
