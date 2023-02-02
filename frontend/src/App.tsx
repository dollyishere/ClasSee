import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import './styles/main.scss';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';

import TestPage from './pages/TestPage';

import Footer from './components/Footer';

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/lesson/:sessionId/:role" element={<LessonPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/image" element={<TestPage />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
};

export default App;
