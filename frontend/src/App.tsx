import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import './styles/main.scss';

import Header from './components/Header';

import MainPage from './pages/MainPage';

import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
