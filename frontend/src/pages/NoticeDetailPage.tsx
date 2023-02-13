import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Divider } from '@mui/material';
import Header from '../components/Header';
import useViewModel from '../viewmodels/NoticeViewModel';
import useTimeStamp from '../utils/TimeStamp';

import { NoticeType } from '../types/NoticeType';
import PrivateInfoState from '../models/PrivateInfoAtom';

const NoticeDetailPage = () => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const navigate = useNavigate();
  const location = useLocation();
  const [noticeId, setNoticeId] = useState<string>(
    location.pathname.split('/')[2],
  );
  const [notice, setNotice] = useState<NoticeType>();
  const { getNotice, deleteNotice } = useViewModel();
  const { toDate } = useTimeStamp();

  const handleNoticeDelete = async () => {
    if (
      window.confirm('정말 삭제하시겠습니까?') &&
      userInfo !== null &&
      userInfo.userRole === 'ROLE_ADMIN'
    ) {
      const response = await deleteNotice(userInfo.email, noticeId);
      if (response.statusCode === 200) {
        navigate('/notice');
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getNotice(noticeId);
      setNotice(response);
    };
    getData();
  }, []);
  return (
    <div className="notice-detail-page">
      <Header />
      <div className="notice-detail-page__contents">
        <div className="notice-detail-page__title">
          <Link to="/notice">공지사항</Link>
        </div>
        {notice !== undefined ? (
          <div className="notice-detail-page__content">
            <div className="notice-detail-page__row">
              <div className="notice-detail-page__label">{notice.title}</div>
              <div className="notice-detail-page__regtime">
                {toDate(notice.regtime)}
              </div>
            </div>
            <Divider variant="middle" style={{ backgroundColor: 'black' }} />
            <div className="notice-detail-page__row">
              <div className="notice-detail-page__content">
                {notice.content}
              </div>
            </div>
            <div className="notice-detail-page__row">
              <div className="notice-detail-page__nickname">
                {notice.userNickname}
              </div>
            </div>
            <Divider variant="middle" style={{ backgroundColor: 'black' }} />
            <div className="notice-detail-page__row">
              {userInfo !== null && userInfo.userRole === 'ROLE_ADMIN' ? (
                <div className="notice-detail-page__buttons--admin">
                  <button
                    type="button"
                    className="button notice-detail-page__button notice-detail-page__button--delete"
                    onClick={handleNoticeDelete}
                  >
                    삭제
                  </button>
                  <Link to={`/notice/write/${noticeId}`}>
                    <button
                      type="button"
                      className="button notice-detail-page__button"
                    >
                      수정
                    </button>
                  </Link>
                </div>
              ) : null}
              <Link to="/notice">
                <button
                  type="button"
                  className="button notice-detail-page__button"
                >
                  목록
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeDetailPage;
