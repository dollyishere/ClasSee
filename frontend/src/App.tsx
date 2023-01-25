import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import './styles/main.scss';

import Header from './components/Header';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LecturePage from './pages/LecturePage';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === '/signup' ||
      location.pathname.split('/')[1] === 'lecture' ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/lecture/*" element={<LecturePage />} />
      </Routes>
    </div>
  );
};

export default App;
