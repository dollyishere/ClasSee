import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Divider } from '@mui/material';
import Header from '../components/Header';
import useViewModel from '../viewmodels/NoticeViewModel';
import useTimeStamp from '../utils/TimeStamp';

import { NoticeType } from '../types/NoticeType';
import PrivateInfoState from '../models/PrivateInfoAtom';

const NoticeDetailPage = () => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const location = useLocation();
  const [noticeId, setNoticeId] = useState<string>(
    location.pathname.split('/')[2],
  );
  const [notice, setNotice] = useState<NoticeType>();
  const { getNotice } = useViewModel();
  const { toDate } = useTimeStamp();

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
        <div className="notice-detail-page__title">공지사항</div>
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
              <button
                type="button"
                className="button notice-detail-page__button"
              >
                목록
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeDetailPage;
