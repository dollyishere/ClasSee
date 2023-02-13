import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Header from '../components/Header';
import PrivateInfoState from '../models/PrivateInfoAtom';

const NoticePage = () => {
  const [page, setPage] = useState<number>(0);
  const [notices, setNotices] = useState(null);
  const userInfo = useRecoilValue(PrivateInfoState);

  useEffect(() => {
    console.log(userInfo);
  }, []);
  return (
    <div className="notice-page">
      <Header />
      <div className="notice-page__contents">
        <div className="notice-page__title">공지사항</div>
        <div className="notice-page__list">
          {userInfo && userInfo.userRole === 'ROLE_ADMIN' ? (
            <div className="notice-page__write">
              <Link to="write">공지사항 작성하기</Link>
            </div>
          ) : null}
          <ul>
            <li>공지</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
