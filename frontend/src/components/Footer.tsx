import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer>
      {/* 로고 */}

      <div className="logo">
        <img alt="" src={logo} />
      </div>

      <div>
        <div>
          <p>(주)My.T 대표:손정훈 주소: 서울특별시 강남수 역삼동 테헤란로 212</p>
        </div>
        <div>
          <p>본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
