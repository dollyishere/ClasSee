import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue } from 'recoil';

import { Notifications, Person } from '@mui/icons-material';
import useLoginViewModel from '../viewmodels/LoginViewModel';
import useProfileViewModel from '../viewmodels/ProfileViewModel';
import logo from '../assets/logo2.png';
import privateInfoState from '../models/PrivateInfoAtom';

const Header = () => {
  const searchbarRef = useRef(null); // 검색창을 접근/제어하기 위한 hook
  const userInfo = useRecoilValue(privateInfoState);
  const [toggleUserInfo, setToggleUserInfo] = useState<boolean>(false);
  const [img, setImg] = useState<string>();
  const { logout } = useLoginViewModel();
  const { getProfileImage } = useProfileViewModel();

  const navigate = useNavigate();

  // form 값 제출시 실행할 함수
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    if (searchbarRef?.current) {
      // searchbarRef.currnet의 타입이 HTMLInputElement라고 컴파일러에게 알려줌
      const target = searchbarRef.current as HTMLInputElement;

      // 검색 로직
      navigate(`/lessons/search/${target.value}`);

      // 검색창을 빈칸으로
      target.value = '';
    }
  };

  const handleToggleUserInfo = () => {
    setToggleUserInfo((prev: boolean) => !prev);
  };
  const handleLogout = async () => {
    if (userInfo?.email) {
      const result = await logout(userInfo?.email);
      navigate('/');
    }
  };

  useEffect(() => {
    if (userInfo !== null && userInfo.img !== null) {
      const getImage = async () => {
        const response = await getProfileImage(userInfo.img);
        setImg(response);
      };
      getImage();
    }
  }, []);
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
          <button
            type="button"
            className="button nav__button"
            onClick={() => navigate('/lessons')}
          >
            강의
          </button>
        </li>
        <li className="nav__item">
          <button
            type="button"
            className="button nav__button"
            onClick={() => navigate('/photo-card')}
          >
            자랑 게시판
          </button>
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
            <button
              type="button"
              className="nav__button button"
              onClick={() => navigate('/create-lesson')}
            >
              강의 개설
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
          {userInfo.img !== null ? (
            <img
              src={img}
              alt={userInfo.nickname}
              className="header__user-img"
            />
          ) : null}
          <div className="header__nickname">{userInfo.nickname}</div>
          <div>{userInfo.point} pt</div>
          <div>
            <button
              type="button"
              className="button header__user-button"
              onClick={() => navigate('/mypage')}
            >
              회원정보
            </button>
            <button
              type="button"
              className="header__user-logout button"
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
