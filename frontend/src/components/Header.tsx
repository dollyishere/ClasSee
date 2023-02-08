import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue } from 'recoil';

import { Notifications, Person } from '@mui/icons-material';
import useViewModel from '../viewmodels/LoginViewModel';
import logo from '../assets/logo2.png';
import privateInfoState from '../models/PrivateInfoAtom';

const Header = () => {
  const searchbarRef = useRef(null); // 검색창을 접근/제어하기 위한 hook
  const userInfo = useRecoilValue(privateInfoState);
  const [toggleUserInfo, setToggleUserInfo] = useState<boolean>(false);
  const viewModel = useViewModel();

  const navigate = useNavigate();

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

  const handleToggleUserInfo = () => {
    setToggleUserInfo((prev: boolean) => !prev);
  };
  const handleLogout = async () => {
    if (userInfo?.email) {
      const result = await viewModel.logout(userInfo?.email);
      if (result === 200) {
        navigate('/');
      }
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
        <li className="nav__item">
          <Link to="/lessons" className="nav__item--link">
            강의
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/proud" className="nav__item--link">
            자랑 게시판
          </Link>
        </li>
      </ul>

      {/* 검색창 */}
      <form className="search" onSubmit={handleSearchSubmit}>
        <input type="text" className="search__searchbar" ref={searchbarRef} />
        <button type="submit" className="search__button">
          <SearchIcon />
        </button>
      </form>

      {/* 버튼 */}
      <ul className="nav">
        <li className="nav__item">
          <Link to="/lesson/test/student" target="_blank">
            <button type="button" className="nav__button button">
              테스트
            </button>
          </Link>
        </li>
        {userInfo === null ? (
          <>
            <li className="nav__item">
              <Link to="/login">
                <button type="button" className="nav__button button">
                  로그인
                </button>
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/signup">
                <button type="button" className="nav__button button">
                  회원가입
                </button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <button type="button" className="nav__button button">
              강의 개설
            </button>
            <button type="button" className="nav__button--icon">
              <Notifications fontSize="large" />
            </button>
            <button
              type="button"
              className="nav__button--icon"
              onClick={handleToggleUserInfo}
            >
              <Person fontSize="large" />
            </button>
          </>
        )}
      </ul>
      {toggleUserInfo && userInfo !== null ? (
        <div className="header__user-info">
          <div>{userInfo.nickname}</div>
          <div>{userInfo.point} pt</div>
          <div>
            <button
              type="button"
              className="header__user-info--logout button"
              onClick={() => navigate('/mypage')}
            >
              회원정보
            </button>
            <button
              type="button"
              className="header__user-info--logout button"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
