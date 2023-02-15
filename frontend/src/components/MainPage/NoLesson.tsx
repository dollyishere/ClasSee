import React from 'react';
import Box from '@mui/material/Box';
import rabbit from '../../assets/rabbit.png';

const NoLesson = ({ message }: { message: string }) => {
  return (
    <div className="nolesson">
      <div className="nolesson__box">
        <h1 className="nolesson__title">현재 {message}한 클래스가 없어요</h1>
        <div className="nolesson__img">
          <img src={rabbit} alt="rabbit" />
          <div className="nolesson__content">
            <h3>{message}하러 가볼까요?</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoLesson;
