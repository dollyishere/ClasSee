import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';

import '../styles/components/header.scss';
import logo from '../assets/logo.png';

const Header = () => {
  const searchbarRef = useRef(null); // 검색창을 접근/제어하기 위한 hook

  // form 값 제출시 실행할 함수
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    if (searchbarRef?.current) {
      // searchbarRef.currnet의 타입이 HTMLInputElement라고 컴파일러에게 알려줌
      const target = searchbarRef.current as HTMLInputElement;

      // 검색 로직
      console.log(target.value);

      // 검색창을 빈칸으로
      target.value = '';
    }
  };

  return (
    <header>
      {/* 로고 */}
      <Link to="/">
        <div className="logo">
          <img alt="" src={logo} />
        </div>
      </Link>

      {/* 네비게이션 */}
      <ul className="nav">
        <li className="nav-item">
          <Link to="/lesson" className="nav-item-link">
            강의
          </Link>
        </li>
        <li className="nav-item">
          <Link to="proud" className="nav-item-link">
            자랑 게시판
          </Link>
        </li>
      </ul>

      {/* 검색창 */}
      <form className="search" onSubmit={handleSearchSubmit}>
        <input type="text" className="searchbar" ref={searchbarRef} />
        <button type="submit" className="search-button">
          <SearchIcon />
        </button>
      </form>
    </header>
  );
};

export default Header;
