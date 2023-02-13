import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const NoticePage = () => {
  const [page, setPage] = useState<number>(0);
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    console.log('마운트');
  }, []);
  return (
    <div className="notice-page">
      <Header />
      <div className="notice-page__contents">
        <div className="notice-page__title">공지사항</div>
        <div className="notice-page__list">
          <ul>
            <li>공지</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
