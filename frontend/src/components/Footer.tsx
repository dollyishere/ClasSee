import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer>
      {/* 로고 */}

      <div className="logo">
        <img alt="" src={logo} />
      </div>

      <div className="info">
        <div className="info__item1">
          <div className="info__mation1">
            <p className="info__item--text">(주)My.T </p>
            <p className="info__item--text"> 대표:손정훈</p>
            <p className="info__item--text">
              주소: 서울특별시 강남구 역삼동 테헤란로 212
            </p>
          </div>
          <div className="info__mation2">
            <p className="info__item--text">이메일: MYT@ssafy.ac.kr</p>
            <p className="info__item--text">Tel: 010-0000-0000</p>
          </div>
        </div>
        <div className="info__item2">
          <p className="info__item--text">
            본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포
            등을 금합니다
          </p>
          <p className="info__item--text2">
            Copyright ⓒ MY.T All Right Reserved
          </p>
        </div>
      </div>
      <div className="info">
        <Link to="/notice" className="announce">
          공지사항
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
