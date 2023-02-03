import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import TestPage from './TestPage';

const MyPage = () => {
  return (
    <Routes>
      <Route path="" element={<ProfilePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default MyPage;
