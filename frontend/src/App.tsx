import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import './styles/main.scss';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import CreateLessonPage from './pages/CreateLessonPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import LessonDetailPage from './pages/LessonDetailPage';
import MyPage from './pages/MyPage';

import TestPage from './pages/TestPage';

import Footer from './components/Footer';

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create_lesson" element={<CreateLessonPage />} />
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/lesson/:sessionId/:role" element={<LessonPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/image" element={<TestPage />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
};

export default App;
