import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import { Notifications, Person } from '@mui/icons-material';
import useViewModel from '../viewmodels/LoginViewModel';
import logo from '../assets/logo2.png';
import privateInfoState from '../models/PrivateInfoAtom';
import useProfileViewModel from '../viewmodels/ProfileViewModel';

// 모달창 스타일
const style = {
  position: 'absolute',
  top: '8.5%',
  right: '0%',
  width: '220px',
  bgcolor: '#F8F7FF',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 4,
};
const Header = () => {
  // const data = localStorage.getItem('PrivateInfo');
  // const privateInfo = data ? JSON.parse(data) : 0;
  // const points = privateInfo.PrivateInfoData.point;
  const searchbarRef = useRef(null); // 검색창을 접근/제어하기 위한 hook
  const userInfo = useRecoilValue(privateInfoState); // 유저 정보를 사용하기 위한 hook
  const viewModel = useViewModel(); // 로그인 viewmodel을 사용하기 위한 hook
  const { getProfileImage, getUserInfo } = useProfileViewModel();
  const [toggleUserInfo, setToggleUserInfo] = useState<boolean>(false); // 개인정보 모달을 띄우기 위한 boolean값
  const handleOpen = () => setToggleUserInfo(true);
  const handleClose = () => setToggleUserInfo(false);
  const [userPoint, setUserPoint] = useState();
  const [teacherImage, setTeacherImage] = useState<string>(logo);

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
      const result = await viewModel.logout(userInfo?.email);
      navigate('/');
    }
  };
  const handleUserPoint = async () => {
    if (userInfo) {
      const response = await getUserInfo(userInfo.email);
      if (response) {
        setUserPoint(response.point);
        console.log(response.point);
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      const getTeacherImage = async () => {
        const teacherImageUrl = await getProfileImage(userInfo.img);
        if (teacherImageUrl) {
          setTeacherImage(teacherImageUrl);
        }
      };
      getTeacherImage();
    }
    handleUserPoint();
  }, [toggleUserInfo]);
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
          <Link to="/photo-card" className="nav__item--link">
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
        {!sessionStorage.getItem('isLogin') ? (
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
              // onClick={handleToggleUserInfo}
              onClick={handleOpen}
            >
              <Person fontSize="large" />
            </button>
          </>
        )}
      </ul>
      {toggleUserInfo && userInfo !== null ? (
        <Modal
          open={toggleUserInfo}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="header__user-info">
              <div className="user__profile">
                <div className="user__profile--img">
                  <Avatar
                    alt="Remy Sharp"
                    src={teacherImage}
                    className="avatar"
                  />
                </div>
                <div className="user__profile--text">
                  <h3 className="user__nickname--text">{userInfo.nickname}</h3>
                  <h3>님</h3>
                </div>
              </div>
              <div className="user__point">
                <p className="user__point--text">
                  {userInfo.point.toLocaleString()} pt
                </p>
              </div>
              <div className="user__info">
                <button
                  type="button"
                  className="user__info--button button"
                  onClick={() => navigate('/mypage')}
                >
                  마이페이지
                </button>
                <button
                  type="button"
                  className="user__logout--button button"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      ) : // <div className="header__user-info">
      //   <div>{userInfo.nickname}</div>
      //   <div>{userInfo.point} pt</div>
      //   <div>
      //     <button
      //       type="button"
      //       className="header__user-info--logout button"
      //       onClick={() => navigate('/mypage')}
      //     >
      //       회원정보
      //     </button>
      //     <button
      //       type="button"
      //       className="header__user-info--logout button"
      //       onClick={handleLogout}
      //     >
      //       로그아웃
      //     </button>
      //   </div>
      // </div>
      null}
    </header>
  );
};

export default Header;
