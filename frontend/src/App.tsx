import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import './styles/main.scss';

import Header from './components/Header';

import MainPage from './pages/MainPage';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
